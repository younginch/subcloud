import {
  searchFromChannel,
  searchFromUser,
  searchFromVideo,
} from "../../../utils/algolia";
import { handleRoute, RouteParams } from "../../../utils/types";

async function search({ req, res, prisma }: RouteParams<any>) {
  const { query } = req.query;

  if (req.query.type === "video") {
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

  if (req.query.type === "channel") {
    const result = await searchFromChannel(query as string);
    const channels = await prisma.youtubeChannel.findMany({
      where: {
        id: {
          in: result.hits.map((hit) => hit.objectID),
        },
      },
      include: {
        videos: true,
      },
    });
    return res.status(200).json(channels);
  }

  if (req.query.type === "user") {
    const result = await searchFromUser(query as string);
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: result.hits.map((hit) => hit.objectID),
        },
      },
    });
    return res.status(200).json(users);
  }

  return res.status(400).json({ message: "Invalid category" });
}

export default handleRoute({ GET: search });
