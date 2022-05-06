import { Request } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function searchSubtitles({ req, res, prisma }: RouteParams<Request[]>) {
  const { userId, serviceId, videoId } = req.query;
  if (userId) {
    const requests = await prisma.request.findMany({
      where: { users: { some: { id: userId as string } } },
    });
    return res.status(200).json(requests);
  }
  if (serviceId && videoId) {
    const requests = await prisma.request.findMany({
      where: {
        serviceId: serviceId as string,
        videoId: videoId as string,
      },
    });
    return res.status(200).json(requests);
  }
}

export default handleRoute({
  GET: searchSubtitles,
});
