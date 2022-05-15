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
    },
  });
  return res.status(200).json(videos);
}

export default handleRoute({ GET: VideoSearchGet });
