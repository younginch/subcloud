import {
  PrismaClient,
  Video,
  YoutubeChannel,
  YoutubeVideo,
} from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";
import { VideoCreateSchema } from "../../../utils/schema";
import axios from "axios";

type ResponseType =
  | (Video & {
      youtubeVideo?: (YoutubeVideo & { channel: YoutubeChannel }) | null;
    })
  | null;

async function VideoCreate({ req, res, prisma }: RouteParams<ResponseType>) {
  const { value, error } = VideoCreateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  const regUrl = getVideoFromUrl(value.url).url;
  const video = await prisma.video.findUnique({
    where: { url: regUrl },
    include: {
      subs: {
        include: { user: { select: { name: true } } },
      },
    },
  });
  if (video) {
    return res.status(200).json(video);
  }
  const createdVideo = await prisma.video.create({
    data: getVideoFromUrl(value.url),
  });
  if (createdVideo.serviceId === "youtube") {
    const videoFromYoutube = await addYoutubeInfo(createdVideo.videoId);
    return res.status(201).json(videoFromYoutube);
  }
  return res.status(201).json(createdVideo);
}

function getYoutubeVideo(url: URL): Video {
  const videoId = url.searchParams.get("v");
  if (url.pathname !== "/watch") {
    throw new Error("Not a video url");
  }
  if (!videoId) {
    throw new Error("No video id");
  }
  return {
    serviceId: "youtube",
    videoId: videoId,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    youtubeVideoId: null,
  };
}

function getVideoFromUrl(urlString: string): Video {
  const url = new URL(urlString);
  if (url.hostname === "www.youtube.com") {
    return getYoutubeVideo(url);
  }
  return {
    serviceId: url.hostname,
    videoId: `${url.pathname}?${url.search}`,
    url: urlString,
    youtubeVideoId: null,
  };
}

async function addYoutubeInfo(videoId: string): Promise<ResponseType> {
  const prisma = new PrismaClient();
  try {
    const videoRes =
      await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}
      &part=snippet,statistics`);
    if (!videoRes.data.items) {
      return null;
    }
    const video = videoRes.data.items[0];
    const channelId = video.snippet.channelId;
    const channel = await prisma.youtubeChannel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      const channelRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,statistics`
      );
      if (!channelRes.data.items) {
        return null;
      }
      const channelData = channelRes.data.items[0];
      await prisma.youtubeChannel.create({
        data: {
          id: channelId,
          title: channelData.snippet.title,
          description: channelData.snippet.description,
          thumbnailUrl: channelData.snippet.thumbnails.medium.url,
          subscriberCount: Number.parseInt(
            channelData.statistics.subscriberCount
          ),
        },
      });
    }
    await prisma.youtubeVideo.create({
      data: {
        id: videoId,
        publishedAt: video.snippet.publishedAt,
        channelId,
        title: video.snippet.title,
        description: video.snippet.description,
        viewCount: Number.parseInt(video.statistics.viewCount),
        likeCount: Number.parseInt(video.statistics.likeCount),
      },
    });
    await prisma.video.update({
      where: { serviceId_videoId: { serviceId: "youtube", videoId } },
      data: { youtubeVideo: { connect: { id: videoId } } },
    });
  } finally {
    return prisma.video.findUnique({
      where: { serviceId_videoId: { serviceId: "youtube", videoId } },
      include: { youtubeVideo: { include: { channel: true } } },
    });
  }
}

export default handleRoute({ POST: VideoCreate }, { useSession: true });
