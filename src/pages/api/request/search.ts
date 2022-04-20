import { PrismaClient, Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import ResError from "../../../utils/apiTypes";

export default async function RequestSearch(
  req: NextApiRequest,
  res: NextApiResponse<Request[] | ResError>
) {
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
