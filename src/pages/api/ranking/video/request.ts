import {
  handleRoute,
  ResRankingVideo,
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
    where.lang = lang;
  }
  const videos = await prisma.video.findMany({
    take: Number(end),
    orderBy: [
      {
        requests: {
          _count: "desc",
        },
      },
    ],
    where,
    include: {
      youtubeVideo: { include: { channel: true } },
      requests: true,
    },
  });
  if (!videos) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingSubView" });
  }
  return res.status(200).json(videos.slice(Number(start)));
}

export default handleRoute({ GET: RankingVideoByRequest });
