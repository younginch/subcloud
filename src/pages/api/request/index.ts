import { PrismaClient, Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ResError from "../../../utils/apiTypes";
import { RequestCreateSchema } from "../../../utils/schema";

export default async function RequestCreate(
  req: NextApiRequest,
  res: NextApiResponse<Request | ResError>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { value, error } = RequestCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const {videoId, lang} = value;
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const prisma = new PrismaClient();
  try {
    const request = await prisma.request.findUnique({
      where: { videoId_lang: { videoId, lang } },
    });
    if (request) {
      const updatedRequest = await prisma.request.update({
        where: { videoId_lang: { videoId, lang } },
        data: {
          users: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
      return res.status(200).json(updatedRequest);
    }
    const createdRequest = await prisma.request.create({
      data: {
        video: { connect: { id: videoId } },
        lang: lang,
        users: { connect: { id: session.user?.id } },
      },
    });
    return res.status(201).json(createdRequest);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
