import { Status, Sub, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import ResError from "../../../utils/types";

export default async function SubSearch(
  req: NextApiRequest,
  res: NextApiResponse<Sub[] | ResError>
) {
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
    return res
      .status(500)
      .json({ error: "Something went wrong", log: e.message });
  }
}
