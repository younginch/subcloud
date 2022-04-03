import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default function Sub(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const { id } = req.query;
    prisma.subscription.findOne({ id: id }).then((sub: any) => {
      res.json(sub);
    });
  } else if (req.method === "POST") {
    const { id } = req.body;
  } else if (req.method === "PATCH") {
    const { id } = req.query;
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    prisma.subscription
      .delete({ id: id })
      .then(() => {
        return res.status(200).json({ message: "Subscription deleted" });
      })
      .catch((e: any) => {});
  }
  res.status(200).json({ name: "John Doe" });
}
