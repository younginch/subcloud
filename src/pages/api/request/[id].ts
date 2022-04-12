import { PrismaClient, Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ResError from "../../../utils/apiTypes";
import getInfoFromUrl from "../../../utils/getInfoFromUrl";

export default async function RequestCRUD(
  req: NextApiRequest,
  res: NextApiResponse<Request | ResError>
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    if (!req.query.id) {
      return res.status(400).json({ error: "No id provided" });
    }
    try {
      const request = await prisma.request.findUnique({
        where: { id: req.query.id as string },
      });
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      return res.status(200).json(request);
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else if (req.method === "POST") {
    const { url } = req.body;
    try {
      const request = await prisma.request.findUnique({
        where: { url: url },
      });
      if (request) {
        const updatedRequest = await prisma.request.update({
          where: { id: request.id },
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
      const { id, type } = getInfoFromUrl(url);
      const createdRequest = await prisma.request.create({
        data: {
          id: id,
          users: { connect: { id: session.user?.id } },
        },
      });
      return res.status(201).json(createdRequest);
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else if (req.method === "DELETE") {
    if (!req.query.id) {
      return res.status(400).json({ error: "No id provided" });
    }
    try {
      const request = await prisma.request.findUnique({
        where: { id: req.query.id as string },
      });
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      const updatedRequest = await prisma.request.update({
        where: { id: request.id },
        data: {
          users: {
            disconnect: {
              id: session.user.id,
            },
          },
        },
      });
      return res.status(200).json(updatedRequest);
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
