import nextConnect from "next-connect";
import multer from "multer";
import multerS3 from "multer-s3";
import { NextApiRequest, NextApiResponse } from "next";
import ResError, {
  ResFileUpload,
  setCORS,
  SubErrorType,
} from "../../../utils/types";
import { getSession } from "next-auth/react";
import { configuredBucket, configuredS3 } from "../../../utils/aws";
import prisma from "../../../utils/prisma";

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.MulterS3.File;
}

const awsStorage = multerS3({
  s3: configuredS3,
  bucket: configuredBucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: awsStorage,
});

const app = nextConnect<
  NextApiRequestWithFile,
  NextApiResponse<ResFileUpload | ResError>
>({
  onError(error, req, res) {
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

app.post(upload.single("file"), async (req, res) => {
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

export default app;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
