import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ResError from "../../../utils/apiTypes";

export default async function UserCRUD(
  req: NextApiRequest,
  res: NextApiResponse<User | ResError>
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const prisma = new PrismaClient();

  if (req.method === "GET") {
  } else if (req.method === "POST") {
  } else if (req.method === "PATCH") {
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const user = await prisma.user.findUnique({
        where: { id: id as string },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (user.id !== id) {
        return res.status(403).json({ error: "Not authorized" });
      }
      const deletedUser = await prisma.user.delete({
        where: { id: id as string },
      });
      return res.status(200).json(deletedUser);
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
