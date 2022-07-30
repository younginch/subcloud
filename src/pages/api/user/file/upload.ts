import { createRouter } from "next-connect";
import type e from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ResError, {
  ResFileUpload,
  setCORS,
  SubErrorType,
} from "../../../../utils/types";
import prisma from "../../../../utils/prisma";
import { upload } from "../../../../utils/aws";

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.MulterS3.File;
}

const expressWrapper =
  (middleware: e.RequestHandler) =>
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    await new Promise<void>((resolve, reject) => {
      middleware(
        req as unknown as e.Request,
        res as unknown as e.Response,
        (err: any) => (err ? reject(err) : resolve())
      );
    });
    return next();
  };

const router = createRouter<
  NextApiRequestWithFile,
  NextApiResponse<ResFileUpload | ResError>
>();

router.post(expressWrapper(upload.single("file")), async (req, res) => {
  await setCORS(req, res);

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      error: SubErrorType.NotAnonymousAuthenticated,
      message: "Not Anonymous Authenticated",
    });
  }
  try {
    const newFile = await prisma.file.create({
      data: {
        user: { connect: { id: session.user.id! } },
        title: req.file.originalname ?? "unknown",
        key: req.file.key,
      },
    });
    return res.status(200).json(newFile);
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: SubErrorType.Unknown, message: e.message });
  }
});

export default router.handler({
  onError(error: any, _, res) {
    res
      .status(501)
      .json({ error: SubErrorType.Unknown, message: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({
      error: SubErrorType.MethodNotAllowed,
      message: `Method '${req.method}' Not Allowed`,
    });
  },
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
