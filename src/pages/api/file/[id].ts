import { File, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ResError from "../../../utils/apiTypes";

export default async function FileRUD(
  req: NextApiRequest,
  res: NextApiResponse<File | ResError>
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const prisma = new PrismaClient();
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const file = await prisma.file.findUnique({
        where: { id: id as string },
      });
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      if (file.userId !== session.user.id) {
        return res.status(403).json({ error: "Not authorized" });
      }
      const deletedFile = await prisma.file.delete({
        where: { id: id as string },
      });
      return res.status(200).json(deletedFile);
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
