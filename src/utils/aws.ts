import {
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";
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
