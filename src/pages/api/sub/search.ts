import { Status, Sub } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function SubSearch({ req, res, prisma }: RouteParams<Sub[]>) {
  const { userId, status } = req.query;
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
}

export default handleRoute({ GET: SubSearch });
