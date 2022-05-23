import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { setCORS } from "../../../utils/types";

export default async function UserSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  setCORS(req, res);

  const session = await getSession({ req });

  return res.status(200).json(session);
}
