import { PrismaClient, Sub } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ResError from "../../../utils/apiTypes";
import { SubCreateSchema } from "../../../utils/schema";

export default async function SubCreate(
  req: NextApiRequest,
  res: NextApiResponse<Sub | ResError>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { value, error } = SubCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const prisma = new PrismaClient();
  try {
    const sub = await prisma.sub.create({
      data: {
        user: { connect: { id: session.user.id } },
        file: { connect: { id: value.fileId } },
        video: { connect: { id: value.videoId } },
        lang: value.lang as string,
      },
    });
    return res.status(201).json(sub);
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: "Something went wrong", log: e.message });
  }
}
