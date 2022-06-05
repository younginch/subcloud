import { Role } from "@prisma/client";
import { getS3Url } from "../../../utils/aws";
import {
  handleRoute,
  ResFileDelete,
  ResFileRead,
  RouteParams,
  SubErrorType,
} from "../../../utils/types";

async function FileRead({ req, res, prisma }: RouteParams<ResFileRead>) {
  if (req.method === "GET") {
    const file = await prisma.file.findUnique({
      where: { id: req.query.id as string },
    });
    if (!file) {
      return res
        .status(404)
        .json({ error: SubErrorType.NotFound, message: "File" });
    }
    const url = await getS3Url(file.key);
    return res.status(200).json({ ...file, url });
  } else if (req.method === "DELETE") {
  }
}

async function FileDelete({
  req,
  res,
  prisma,
  session,
}: RouteParams<ResFileDelete>) {
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
  { role: Role.User }
);
