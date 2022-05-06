import AWS from "aws-sdk";

export const configuredS3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

export const configuredBucket =
  process.env.NODE_ENV === "development"
    ? "younginch-sub-dev"
    : "younginch-sub-prod";
