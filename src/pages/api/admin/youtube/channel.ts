import { handleRoute, RouteParams } from "../../../../utils/types";
import { getYoutubeChannelData } from "../../../../utils/youtube";

async function updateChannels({ req, res, prisma }: RouteParams<number>) {
  const count = Number(req.query.count ?? "100");
  const youtubeChannels = await prisma.youtubeChannel.findMany({
    orderBy: {
      updateAt: "desc",
    },
    take: count,
  });
  youtubeChannels.forEach(async (youtubeChannel) => {
    const data = await getYoutubeChannelData(youtubeChannel.id);
    await prisma.youtubeChannel.update({
      where: { id: youtubeChannel.id },
      data,
    });
  });
  return res.status(200).json(youtubeChannels.length);
}

export default handleRoute({ PATCH: updateChannels });
