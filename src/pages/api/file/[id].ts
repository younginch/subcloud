import { File } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function FileRead({ req, res, prisma, session }: RouteParams<File>) {
  if (req.method === "GET") {
    const file = await prisma.file.findUnique({
      where: { id: req.query.id as string },
    });
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    return res.status(200).json(file);
  } else if (req.method === "DELETE") {
  }
}

async function FileDelete({ req, res, prisma, session }: RouteParams<File>) {
  const { id } = req.query;
  const file = await prisma.file.findUnique({
    where: { id: id as string },
  });
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  if (file.userId !== session?.user.id) {
    return res.status(403).json({ error: "Not authorized" });
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
