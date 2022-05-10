import { Sub } from "@prisma/client";
import {
  handleRoute,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";

async function SubViewAdd({ req, res, prisma }: RouteParams<Sub>) {
  const { id } = req.query;
  const sub = await prisma.sub.findUnique({ where: { id: id as string } });
  if (!sub) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  const updatedSub = await prisma.sub.update({
    where: { id: id as string },
    data: { views: sub.views + 1 },
  });
  return res.status(200).json(updatedSub);
}

export default handleRoute({ POST: SubViewAdd }, { useSession: true });
