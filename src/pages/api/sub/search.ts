// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  try {
    const Subs = await prisma.sub.findMany({});
    return res.status(200).json(Subs);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
