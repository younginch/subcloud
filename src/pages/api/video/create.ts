import { InfoYoutube, PrismaClient, Video } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import ResError, { VideoWithInfo } from "../../../utils/types";
import NextCors from "nextjs-cors";
import { getSession } from "next-auth/react";
import { VideoCreateSchema } from "../../../utils/schema";
import axios from "axios";

export default async function VideoCreate(
  req: NextApiRequest,
  res: NextApiResponse<Video | VideoWithInfo | ResError>
) {
  await NextCors(req, res, {
    // Options
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { value, error } = VideoCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const prisma = new PrismaClient();
  try {
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
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", log: e.message });
  }
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

async function addYoutubeVideoInfos(videoId: string): Promise<InfoYoutube> {
  const res =
    await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}
      &part=snippet,statistics`);
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
