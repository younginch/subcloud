import { Role } from "@prisma/client";
import {
  handleRoute,
  ResSubView,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";

async function SubViewAdd({
  req,
  res,
  prisma,
  session,
}: RouteParams<ResSubView>) {
  const { id } = req.query;
  const { viewAt } = req.body;
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
  await prisma.subHistory.create({
    data: {
      subId: sub.id,
      userId: session?.user.id as string,
      viewAt,
    },
  });
  return res.status(200).json(updatedSub);
}

export default handleRoute({ POST: SubViewAdd }, { role: Role.User });
