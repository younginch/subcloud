import { Role, Video } from "@prisma/client";
import { saveVideoToAlgolia } from "../../../../utils/algolia";
import prisma from "../../../../utils/prisma";
import { VideoCreateSchema } from "../../../../utils/schema";
import {
  handleRoute,
  ResVideo,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";
import {
  getYoutubeChannelData,
  getYoutubeVideoData,
} from "../../../../utils/youtube";

function getYoutubeVideo(url: URL): Video {
  if (url.pathname !== "/watch") {
    if (url.hostname === "youtu.be") {
      const videoId = url.pathname.split("/")[1];
      return {
        serviceId: "youtube",
        videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        youtubeVideoId: null,
      };
    }
    throw new Error("Not a video url");
  }
  const videoId = url.searchParams.get("v");
  if (!videoId) {
    throw new Error("No video id");
  }
  return {
    serviceId: "youtube",
    videoId,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    youtubeVideoId: null,
  };
}

function getVideoFromUrl(urlString: string): Video {
  const url = new URL(urlString);
  if (url.hostname.includes("youtu")) {
    return getYoutubeVideo(url);
  }
  return {
    serviceId: url.hostname,
    videoId: `${url.pathname}?${url.search}`,
    url: urlString,
    youtubeVideoId: null,
  };
}

async function addYoutubeInfo(videoId: string): Promise<ResVideo> {
  const videoData = await getYoutubeVideoData(videoId);
  const { channelId } = videoData;
  const channel = await prisma.youtubeChannel.findUnique({
    where: { id: videoData.channelId },
  });
  if (!channel) {
    const channelData = await getYoutubeChannelData(channelId);
    await prisma.youtubeChannel.create({
      data: {
        id: channelId,
        ...channelData,
      },
    });
  }
  await prisma.youtubeVideo.create({
    data: {
      id: videoId,
      ...videoData,
    },
  });
  await prisma.video.update({
    where: { serviceId_videoId: { serviceId: "youtube", videoId } },
    data: { youtubeVideo: { connect: { id: videoId } } },
  });
  // eslint-disable-next-line no-unsafe-finally
  return prisma.video.findUnique({
    where: { serviceId_videoId: { serviceId: "youtube", videoId } },
    include: { youtubeVideo: { include: { channel: true } } },
  }) as unknown as ResVideo;
}

async function VideoCreate({ req, res, prisma }: RouteParams<ResVideo>) {
  const { value, error } = VideoCreateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  const regUrl = getVideoFromUrl(value.url).url;
  const video = await prisma.video.findUnique({
    where: { url: regUrl },
    include: { youtubeVideo: { include: { channel: true } } },
  });
  if (video) {
    if (video.youtubeVideo) return res.status(200).json(video);
    const videoFromYoutube = await addYoutubeInfo(video.videoId);
    return res.status(200).json(videoFromYoutube);
  }
  try {
    const createdVideo = await prisma.video.create({
      data: getVideoFromUrl(value.url),
    });
    if (createdVideo.serviceId === "youtube") {
      const videoFromYoutube = await addYoutubeInfo(createdVideo.videoId);
      saveVideoToAlgolia(videoFromYoutube);
      return res.status(201).json(videoFromYoutube);
    }
    return res.status(201).json(createdVideo);
  } catch {
    const video = await prisma.video.findUnique({
      where: { url: regUrl },
      include: { youtubeVideo: { include: { channel: true } } },
    });
    if (video) {
      saveVideoToAlgolia(video);
      if (video.youtubeVideo) return res.status(200).json(video);
      const videoFromYoutube = await addYoutubeInfo(video.videoId);
      return res.status(200).json(videoFromYoutube);
    }
  }
}

async function VideoRead({ req, res, prisma }: RouteParams<ResVideo>) {
  const serviceId = req.query.serviceId as string;
  const videoId = req.query.videoId as string;
  if (!serviceId || !videoId) {
    return res
      .status(400)
      .json({ error: SubErrorType.Validation, message: "id" });
  }
  const video = await prisma.video.findUnique({
    where: { serviceId_videoId: { serviceId, videoId } },
    include: { youtubeVideo: { include: { channel: true } } },
  });
  if (!video) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Video" });
  }
  return res.status(200).json(video);
}

export default handleRoute(
  { POST: VideoCreate, GET: VideoRead },
  { role: Role.User }
);
