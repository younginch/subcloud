import { PrismaClient, Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import NextCors from "nextjs-cors";
import ResError from "../../../utils/types";

export default async function RequestCRUD(
  req: NextApiRequest,
  res: NextApiResponse<Request | ResError>
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
