import { handleRoute, ResSubSearch, RouteParams } from "../../../utils/types";

async function SubSearch({ req, res, prisma }: RouteParams<ResSubSearch>) {
  const { serviceId, videoId, userId, status } = req.query;
  const include = {
    video: { include: { youtubeVideo: { include: { channel: true } } } },
  };
  let where: any = {};
  if (userId) {
    where.userId = userId;
  }
  if (serviceId && videoId) {
    where.serviceId = serviceId;
    where.videoId = videoId;
  }
  if (status) {
    if (status !== "all") {
      where.status = status;
    }
  }

  const subs = await prisma.sub.findMany({
    where,
    include,
  });

  return res.status(200).json(subs);
}

export default handleRoute({ GET: SubSearch });
