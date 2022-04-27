import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import ResError from "../../../utils/types";

export default async function AdminDelete(
  req: NextApiRequest,
  res: NextApiResponse<{} | ResError>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ error: "Unauthorized in production" });
  }
  const prisma = new PrismaClient();
  try {
    await prisma.account.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.verificationToken.deleteMany({});
    await prisma.video.deleteMany({});
    await prisma.request.deleteMany({});
    await prisma.file.deleteMany({});
    await prisma.sub.deleteMany({});
    await prisma.subReview.deleteMany({});
    return res.status(200).json({});
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
