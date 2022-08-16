import { saveVideoToAlgolia } from "../../../../utils/algolia";
import { handleRoute, RouteParams } from "../../../../utils/types";

async function saveVideoIndex({ res, prisma }: RouteParams<void>) {
  const videos = await prisma.video.findMany({
    include: { youtubeVideo: { include: { channel: true } } },
  });
  videos.forEach((video) => {
    saveVideoToAlgolia(video);
  });
  res.status(200).json();
}

export default handleRoute({ POST: saveVideoIndex });
