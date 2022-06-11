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
  const isLang = lang && lang !== "All Lang";
  if (isLang) {
    where = {
      requests: {
        some: {
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
    if (a._count.requests === b._count.requests)
      return b._count.points - a._count.points;
    return b._count.requests - a._count.requests;
  };
  const newVideos = videos
    .map((video) => {
      const requests = video.requests.filter(
        (request) => !isLang || request.lang === lang
      );
      return {
        url: video.url,
        serviceId: video.serviceId,
        videoId: video.videoId,
        youtubeVideoId: video.youtubeVideoId,
        youtubeVideo: video.youtubeVideo,
        _count: {
          requests: requests.reduce(
            (prev, curr) => prev + curr.users.length,
            0
          ),
          points: requests.reduce((prev, curr) => prev + curr.point, 0),
        },
        langs: requests
          .slice(1)
          .reduce((prev, curr) => prev + ", " + curr.lang, requests[0].lang),
      };
    })
    .sort(compareByRequests);
  if (!videos) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingVideoByRequest" });
  }
  return res.status(200).json(newVideos.slice(Number(start), Number(end)));
}

export default handleRoute({ GET: RankingVideoByRequest });
