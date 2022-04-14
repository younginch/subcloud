import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Sub } from "@prisma/client";
import { getSession } from "next-auth/react";
import ResError from "../../../utils/apiTypes";

export default async function SubCRUD(
  req: NextApiRequest,
  res: NextApiResponse<Sub | ResError>
) {
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
  } else if (req.method === "POST") {
    const { fileId, videoId, lang } = req.body;
    if (!fileId || !videoId || !lang) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const sub = await prisma.sub.create({
        data: {
          user: { connect: { id: session.user.id } },
          file: { connect: { id: fileId } },
          video: { connect: { id: videoId } },
          lang: lang as string,
        },
      });
      return res.status(201).json(sub);
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
    const sub = await prisma.sub.delete({ where: { id: id as string } });
    return res.status(200).json(sub);
  }
  return res.status(405).json({ error: "Method not allowed" });
}
