import { PrismaClient, Sub } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import ResError from "../../../utils/apiTypes";

export default async function SubSearch(
  req: NextApiRequest,
  res: NextApiResponse<Sub[] | ResError>
) {
  const prisma = new PrismaClient();
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }
  const { userId } = req.query;
  try {
    const subs = await prisma.sub.findMany({
      where: { userId: userId as string },
    });
    return res.status(200).json(subs);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
