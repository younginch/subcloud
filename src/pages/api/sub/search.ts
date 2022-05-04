import { Status, Sub, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import ResError, { handleServerError } from "../../../utils/types";

export default async function SubSearch(
  req: NextApiRequest,
  res: NextApiResponse<Sub[] | ResError>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }
  const { userId, status } = req.query;
  const prisma = new PrismaClient();
  try {
    let subs: Sub[] = [];
    if (status === "all") {
      subs = await prisma.sub.findMany({
        where: { userId: userId as string },
      });
    } else {
      subs = await prisma.sub.findMany({
        where: { userId: userId as string, status: status as Status },
      });
    }
    return res.status(200).json(subs);
  } catch (e: any) {
    return handleServerError(res, e);
  }
}
