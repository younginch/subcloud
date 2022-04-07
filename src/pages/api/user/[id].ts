import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import ResError from "../../../utils/apiTypes";

export default function UserCRUD(
  req: NextApiRequest,
  res: NextApiResponse<User | ResError>
) {
  return res.status(405).json({ error: "Method not allowed" });
}
