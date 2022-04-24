import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import NextCors from "nextjs-cors";
import ResError from "../../../utils/types";

export default async function UserCRUD(
  req: NextApiRequest,
  res: NextApiResponse<User | ResError>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    if(!req.query.id) {
      return res.status(400).json({ error: "GET requests should not have an ID" });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.query.id as string },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } else if (req.method === "POST") {
  } else if (req.method === "PATCH") {
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "No id provided" });
    }
    try {
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
