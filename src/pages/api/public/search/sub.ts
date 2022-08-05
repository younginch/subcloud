import {
  handleRoute,
  ResSubSearch,
  RouteParams,
} from "../../../../utils/types";

async function SubSearch({ req, res, prisma }: RouteParams<ResSubSearch>) {
  const { serviceId, videoId, userId, status } = req.query;
  const where: any = {};
  if (userId) {
    where.userId = userId;
  }
  if (serviceId && videoId) {
    where.serviceId = serviceId;
    where.videoId = videoId;
  }
  if (status) {
    if (status !== "All") {
      where.status = status;
    }
  }

  const subs = await prisma.sub.findMany({
    where,
    include: {
      video: { include: { youtubeVideo: { include: { channel: true } } } },
      user: true,
      ratings: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(subs);
}

export default handleRoute({ GET: SubSearch });
