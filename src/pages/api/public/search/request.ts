import {
  handleRoute,
  ResRequestSearch,
  RouteParams,
} from "../../../../utils/types";

// eslint-disable-next-line consistent-return
async function searchSubtitles({
  req,
  res,
  prisma,
}: RouteParams<ResRequestSearch>) {
  const { userId, serviceId, videoId } = req.query;
  if (userId) {
    const requests = await prisma.request.findMany({
      where: { users: { some: { id: userId as string } } },
      include: {
        _count: {
          select: { users: true },
        },
        video: {
          include: {
            youtubeVideo: {
              include: {
                channel: true,
              },
            },
          },
        },
        requestPoints: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const newRequests = requests.map((request) => {
      const userPoint = request.requestPoints
        .filter((rpoint) => rpoint.userId === userId)
        .reduce((prev, curr) => prev + curr.point, 0);
      return {
        id: request.id,
        serviceId: request.serviceId,
        videoId: request.videoId,
        video: request.video,
        lang: request.lang,
        point: userPoint,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
        status: request.status,
        _count: {
          users: request._count.users,
        },
      };
    });
    return res.status(200).json(newRequests);
  }
  if (serviceId && videoId) {
    const requestsWithUserCount = await prisma.request.findMany({
      where: {
        serviceId: serviceId as string,
        videoId: videoId as string,
      },
      include: {
        _count: {
          select: { users: true },
        },
      },
    });
    return res.status(200).json(requestsWithUserCount);
  }
}

export default handleRoute({
  GET: searchSubtitles,
});
