import nextConnect from "next-connect";
import multer, { diskStorage } from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { File, PrismaClient } from "@prisma/client";
import ResError from "../../../utils/types";
import { getSession } from "next-auth/react";
import NextCors from "nextjs-cors";

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File & Express.MulterS3.File;
}

const localStorage = diskStorage({
  destination: "./public/s3",
  filename: (req, file, cb) => cb(null, file.originalname),
});

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const awsStorage = multerS3({
  s3: s3,
  bucket: "younginchlab-sub",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.filename}`);
  },
});

const upload = multer({
  storage: process.env.NODE_ENV === "development" ? localStorage : awsStorage,
});

const app = nextConnect<
  NextApiRequestWithFile,
  NextApiResponse<File | ResError>
>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

app.post(upload.single("file"), async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not Logged In" });
  }
  const prisma = new PrismaClient();
  try {
    const newFile = await prisma.file.create({
      data: {
        user: { connect: { id: session.user.id! } },
        title: req.file.originalname ?? "unknown",
        url:
          process.env.NODE_ENV === "development"
            ? req.file.path
            : req.file.location,
      },
    });
    return res.status(200).json(newFile);
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
});

export default app;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
