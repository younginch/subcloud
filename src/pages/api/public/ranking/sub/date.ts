import {
  handleRoute,
  ResRankingSub,
  RouteParams,
  SubErrorType,
} from "../../../../../utils/types";

async function RankingSubByDate({
  req,
  res,
  prisma,
}: RouteParams<ResRankingSub>) {
  const { lang, start, end, order } = req.query;
  if (!start && !end) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "FormInvalidated" });
  }
  const where: any = { status: "Approved" };
  const orderBy: any = { createdAt: order as string };
  if (lang && lang !== "All Lang") {
    where.lang = lang;
  }
  const subs = await prisma.sub.findMany({
    take: Number(end),
    orderBy,
    where,
    include: {
      video: { include: { youtubeVideo: { include: { channel: true } } } },
      user: true,
    },
  });
  if (!subs) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingSubView" });
  }
  return res.status(200).json(subs.slice(Number(start)));
}

export default handleRoute({ GET: RankingSubByDate });
