import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Sub } from "@prisma/client";
import { getSession } from "next-auth/react";
import ResError from "../../../utils/types";
import NextCors from "nextjs-cors";

export default async function SubRUD(
  req: NextApiRequest,
  res: NextApiResponse<Sub | ResError>
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
    const { id } = req.query;
    try {
      const sub = await prisma.sub.findUnique({ where: { id: id as string } });
      if (!sub) {
        return res.status(404).json({ error: "Sub not found" });
      }
      return res.status(200).json(sub);
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else if (req.method === "PATCH") {
    const { id } = req.body;
    try {
      const sub = await prisma.sub.findUnique({ where: { id: id as string } });
      if (!sub) {
        return res.status(404).json({ error: "Sub not found" });
      }
      const updatedSub = await prisma.sub.update({
        where: { id: id as string },
        data: {},
      });
      return res.status(200).json(updatedSub);
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const sub = await prisma.sub.findUnique({ where: { id: id as string } });
      if (!sub) {
        return res.status(404).json({ error: "Sub not found" });
      }
      if (sub.userId !== session.user.id) {
        return res.status(403).json({ error: "Not authorized" });
      }
      const deletedSub = await prisma.sub.delete({ where: { id: id as string } });
      return res.status(200).json(deletedSub);
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
