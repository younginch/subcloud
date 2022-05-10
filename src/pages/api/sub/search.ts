import { Status, Sub } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function SubSearch({ req, res, prisma }: RouteParams<Sub[]>) {
  const { serviceId, videoId, userId, status } = req.query;
  let subs: Sub[] = [];
  if (userId) {
    if (status === "all") {
      subs = await prisma.sub.findMany({
        where: { userId: userId as string },
      });
    } else {
      subs = await prisma.sub.findMany({
        where: { userId: userId as string, status: status as Status },
      });
    }
  } else if (serviceId && videoId) {
    subs = await prisma.sub.findMany({
      where: { serviceId: serviceId as string, videoId: videoId as string },
    });
  }

  return res.status(200).json(subs);
}

export default handleRoute({ GET: SubSearch });
