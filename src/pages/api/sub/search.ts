import { Status, Sub } from "@prisma/client";
import { handleRoute, ResSubSearch, RouteParams } from "../../../utils/types";

async function SubSearch({ req, res, prisma }: RouteParams<ResSubSearch>) {
  const { serviceId, videoId, userId, status } = req.query;
  const include = {
    video: { include: { youtubeVideo: { include: { channel: true } } } },
  };
  let subs: ResSubSearch = [];
  if (userId) {
    if (status === "all") {
      subs = await prisma.sub.findMany({
        where: { userId: userId as string },
        include,
      });
    } else {
      subs = await prisma.sub.findMany({
        where: { userId: userId as string, status: status as Status },
        include,
      });
    }
  } else if (serviceId && videoId) {
    subs = await prisma.sub.findMany({
      where: { serviceId: serviceId as string, videoId: videoId as string },
      include,
    });
  }

  return res.status(200).json(subs);
}

export default handleRoute({ GET: SubSearch });
