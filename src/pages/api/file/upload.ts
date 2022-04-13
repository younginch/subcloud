import nextConnect from "next-connect";
import multer, { diskStorage } from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

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
  bucket: "younginch-sub",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `uploads/${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: process.env.NODE_ENV === "development" ? localStorage : awsStorage,
});

const app = nextConnect<NextApiRequest, NextApiResponse<any | ApiError>>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

app.use(upload.single("file"));

app.post((req, res) => {
  res.status(200).json({ data: "success" });
});

export default app;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
