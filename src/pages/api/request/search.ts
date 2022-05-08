import {
  handleRoute,
  RequestWithUserCount,
  RouteParams,
} from "../../../utils/types";

async function searchSubtitles({
  req,
  res,
  prisma,
}: RouteParams<RequestWithUserCount[]>) {
  const { userId, serviceId, videoId } = req.query;
  if (userId) {
    const requests = await prisma.request.findMany({
      where: { users: { some: { id: userId as string } } },
      include: {
        _count: {
          select: { users: true },
        },
      },
    });
    return res.status(200).json(requests);
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
