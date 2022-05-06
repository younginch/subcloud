import { InfoYoutube, PrismaClient, Video } from "@prisma/client";
import {
  handleRoute,
  RouteParams,
  SubErrorType,
  VideoWithInfo,
} from "../../../utils/types";
import { VideoCreateSchema } from "../../../utils/schema";
import axios from "axios";

async function VideoCreate({ req, res, prisma }: RouteParams<VideoWithInfo>) {
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
  if (!video) {
    const createdVideo = await prisma.video.create({
      data: getVideoFromUrl(value.url),
    });
    let info;
    if (createdVideo.serviceId === "youtube") {
      info = await addYoutubeVideoInfos(createdVideo.videoId);
    }
    return res.status(201).json({ ...createdVideo, info });
  }
  return res.status(200).json(video);
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
  };
}

async function addYoutubeVideoInfos(
  videoId: string
): Promise<InfoYoutube | null> {
  const res =
    await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}
      &part=snippet,statistics`);
  if (!res.data.videos) {
    return null;
  }
  const video = res.data.videos[0];
  const prisma = new PrismaClient();
  const info = await prisma.infoYoutube.update({
    where: { id: videoId },
    data: {
      publishedAt: video.snippet.publishedAt,
      channelId: video.snippet.channelId,
      title: video.snippet.title,
      description: video.snippet.description,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
    },
  });
  return info;
}

export default handleRoute({ POST: VideoCreate }, { useSession: true });
