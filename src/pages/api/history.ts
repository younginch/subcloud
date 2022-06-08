import { Role, SubHistory } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../utils/types";

async function getHistory({ req, res, prisma }: RouteParams<SubHistory[]>) {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).send({
      error: SubErrorType.InvalidRequest,
      message: "User ID is required",
    });
  }
  const history = await prisma.subHistory.findMany({
    where: {
      id: userId,
    },
  });
  return res.status(200).json(history);
}

export default handleRoute({ GET: getHistory }, { role: Role.User });
