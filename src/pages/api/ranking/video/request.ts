import {
  handleRoute,
  ResRankingVideo,
  VideoWithRequest,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";

async function RankingVideoByRequest({
  req,
  res,
  prisma,
}: RouteParams<ResRankingVideo>) {
  const { lang, start, end } = req.query;
  if (!start && !end) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "FormInvalidated" });
  }
  let where: any = {};
  if (lang) {
    where = {
      requests: {
        every: {
          lang: lang,
        },
      },
    };
  }
  const videos = await prisma.video.findMany({
    where,
    include: {
      requests: {
        include: { users: true },
      },
      youtubeVideo: { include: { channel: true } },
    },
  });
  const compareByRequests = (a: VideoWithRequest, b: VideoWithRequest) => {
    return b._count.requests - a._count.requests;
  };
  const newVideos = videos
    .map((video) => {
      return {
        url: video.url,
        serviceId: video.serviceId,
        videoId: video.videoId,
        youtubeVideoId: video.youtubeVideoId,
        youtubeVideo: video.youtubeVideo,
        _count: {
          requests: video.requests.reduce(
            (prev, curr) => prev + curr.users.length,
            0
          ),
          points: video.requests.reduce((prev, curr) => prev + curr.point, 0),
        },
      };
    })
    .sort(compareByRequests);
  if (!videos) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingSubView" });
  }
  return res.status(200).json(newVideos.slice(Number(start), Number(end)));
}

export default handleRoute({ GET: RankingVideoByRequest });
