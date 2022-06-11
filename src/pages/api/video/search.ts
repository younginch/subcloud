import { handleRoute, RouteParams } from "../../../utils/types";

async function VideoSearchGet({ req, res, prisma }: RouteParams<any>) {
  let where: any = {};
  if (req.query.q) {
    where.body = {
      search: req.query.q,
    };
  }
  const videos = await prisma.video.findMany({
    where,
    include: {
      youtubeVideo: { include: { channel: true } },
      _count: { select: { requests: true, subs: true } },
      requests: true,
    },
  });
  const newVideos = videos.map((video) => {
    return {
      url: video.url,
      serviceId: video.serviceId,
      videoId: video.videoId,
      youtubeVideoId: video.youtubeVideoId,
      youtubeVideo: video.youtubeVideo,
      _count: {
        requests: video._count.requests,
        subs: video._count.subs,
        points: video.requests.reduce((prev, curr) => prev + curr.point, 0),
      },
    };
  });
  return res.status(200).json(newVideos);
}

export default handleRoute({ GET: VideoSearchGet });
