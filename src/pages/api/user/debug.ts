import { Role, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import ResError, { SubErrorType } from "../../../utils/types";

export default async function UserDebug(
  req: NextApiRequest,
  res: NextApiResponse<User | ResError>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      error: SubErrorType.DebugOnly,
      message: "Unauthorized in production",
    });
  }
  const user = await prisma.user.update({
    where: { id: req.body.id as string },
    data: { role: Role.ADMIN },
  });
  return res.status(200).json(user);
}
