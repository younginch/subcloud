import { handleRoute, RouteParams } from "../../../../utils/types";

async function VideoSearchGet({ req, res, prisma }: RouteParams<any>) {
  const where: any = {};
  const { serviceId, videoId, lang } = req.query;
  if (req.query.q) {
    where.body = {
      search: req.query.q,
    };
  }
  if (serviceId && videoId) {
    where.serviceId = serviceId;
    where.videoId = videoId;
  }
  const videos = await prisma.video.findMany({
    where,
    include: {
      youtubeVideo: { include: { channel: true } },
      subs: true,
      requests: { include: { users: true } },
    },
  });
  const newVideos = videos.map((video) => {
    const filterSubs = video.subs.filter((sub) => !lang || sub.lang === lang);
    const filterRequests = video.requests.filter(
      (request) => !lang || request.lang === lang
    );

    return {
      url: video.url,
      serviceId: video.serviceId,
      videoId: video.videoId,
      youtubeVideoId: video.youtubeVideoId,
      youtubeVideo: video.youtubeVideo,
      _count: {
        requests: filterRequests.reduce(
          (prev, curr) => prev + curr.users.length,
          0
        ),
        subs: filterSubs.length,
        points: filterRequests.reduce((prev, curr) => prev + curr.point, 0),
      },
    };
  });
  return res.status(200).json(newVideos);
}

export default handleRoute({ GET: VideoSearchGet });
