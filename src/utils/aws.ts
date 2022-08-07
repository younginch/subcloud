import {
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import type e from "express";

const configuredBucket =
  process.env.NODE_ENV === "development"
    ? "younginch-sub-dev"
    : "younginch-sub-prod";

const configuredS3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  region: "ap-northeast-2",
});

const awsStorage = multerS3({
  s3: configuredS3,
  bucket: configuredBucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata(req: any, file: any, cb: any) {
    cb(null, { fieldName: file.fieldname });
  },
  key(req: any, file: any, cb: any) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

function fileFilter(
  _: e.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  if (
    file.mimetype === "text/plain" ||
    file.mimetype === "text/vtt" ||
    file.mimetype === "application/octet-stream"
  ) {
    callback(null, true);
  } else {
    callback(new Error("File type is not for subtitle"));
  }
}

export const upload = multer({
  storage: awsStorage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export async function getS3Url(key: string) {
  const getObjectParams = {
    Bucket: configuredBucket,
    Key: key,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(configuredS3, command, { expiresIn: 60 });
  return url;
}

export async function deleteAllObjects() {
  const listObjectsParams = {
    Bucket: configuredBucket,
  };
  const listObjectsCommand = new ListObjectsCommand(listObjectsParams);
  const listObjectsResult = await configuredS3.send(listObjectsCommand);
  const deleteObjectsParams = {
    Bucket: configuredBucket,
    Delete: {
      Objects: listObjectsResult.Contents?.map((content) => ({
        Key: content.Key,
      })),
    },
  };
  const deleteObjectsCommand = new DeleteObjectsCommand(deleteObjectsParams);
  await configuredS3.send(deleteObjectsCommand);
}
