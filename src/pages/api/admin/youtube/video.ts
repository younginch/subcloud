import { handleRoute, RouteParams } from "../../../../utils/types";
import { getYoutubeVideoData } from "../../../../utils/youtube";

async function updateVideos({ req, res, prisma }: RouteParams<number>) {
  const count = Number(req.query.count ?? "100");
  const youtubeVideos = await prisma.youtubeVideo.findMany({
    orderBy: {
      updateAt: "desc",
    },
    take: count,
  });
  youtubeVideos.forEach(async (youtubeVideo) => {
    const data = await getYoutubeVideoData(youtubeVideo.id);
    await prisma.youtubeVideo.update({ where: { id: youtubeVideo.id }, data });
  });
  return res.status(200).json(youtubeVideos.length);
}

export default handleRoute({ PATCH: updateVideos });
