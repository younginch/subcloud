import { File } from "@prisma/client";
import { configuredBucket, configuredS3 } from "../../../utils/aws";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function FileRead({ req, res, prisma }: RouteParams<any>) {
  if (req.method === "GET") {
    const file = await prisma.file.findUnique({
      where: { id: req.query.id as string },
    });
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    const url = await configuredS3.getSignedUrlPromise("getObject", {
      Bucket: configuredBucket,
      Key: file.key,
    });
    return res.status(200).json({ ...file, url });
  } else if (req.method === "DELETE") {
  }
}

async function FileDelete({ req, res, prisma, session }: RouteParams<File>) {
  const { id } = req.query;
  const file = await prisma.file.findUnique({
    where: { id: id as string },
  });
  if (!file) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  if (file.userId !== session?.user.id) {
    return res.status(403).json({
      error: SubErrorType.NotUserSpecificAuthenticated,
      message: "Sign in with proper account",
    });
  }
  const deletedFile = await prisma.file.delete({
    where: { id: id as string },
  });
  return res.status(200).json(deletedFile);
}

export default handleRoute(
  {
    GET: FileRead,
    DELETE: FileDelete,
  },
  { useSession: true }
);
