import { searchFromVideo } from "../../../../utils/algolia";
import { handleRoute, RouteParams } from "../../../../utils/types";

async function searchVideos({ req, res, prisma }: RouteParams<any>) {
  const { query } = req.query;

  const result = await searchFromVideo(query as string);
  const videos = await prisma.video.findMany({
    where: {
      url: {
        in: result.hits.map((hit) => hit.objectID),
      },
    },
    include: {
      youtubeVideo: {
        include: {
          channel: true,
        },
      },
    },
  });
  return res.status(200).json(videos);
}

export default handleRoute({ GET: searchVideos });
