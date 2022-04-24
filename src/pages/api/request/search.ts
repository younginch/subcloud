import { PrismaClient, Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import ResError from "../../../utils/types";

export default async function RequestSearch(
  req: NextApiRequest,
  res: NextApiResponse<Request[] | ResError>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const prisma = new PrismaClient();
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }
  const { userId } = req.query;
  try {
    const requests = await prisma.request.findMany({
      where: { users: { some: { id: userId as string } } },
    });
    return res.status(200).json(requests);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
