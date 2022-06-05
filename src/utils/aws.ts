import { S3Client } from "@aws-sdk/client-s3";

export const configuredBucket =
  process.env.NODE_ENV === "development"
    ? "younginch-sub-dev"
    : "younginch-sub-prod";

export const configuredS3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  region: "ap-northeast-2",
});
