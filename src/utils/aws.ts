import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export async function getS3Url(key: string) {
  const getObjectParams = {
    Bucket: configuredBucket,
    Key: key,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(configuredS3, command, { expiresIn: 60 });
  return url;
}
