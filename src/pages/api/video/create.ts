import { PrismaClient, Video } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import ResError from "../../../utils/types";
import NextCors from "nextjs-cors";
import { getSession } from "next-auth/react";
import { VideoCreateSchema } from "../../../utils/schema";

export default async function VideoCreate(
  req: NextApiRequest,
  res: NextApiResponse<Video | ResError>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
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
    const video = await prisma.video.findUnique({
      where: { url: value.url },
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
      return res.status(201).json(createdVideo);
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
    id: `youtube.${videoId}`,
    service: "youtube",
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
    id: `${url.hostname}.${url.pathname}?${url.search}`,
    service: url.hostname,
    videoId: `${url.pathname}?${url.search}`,
    url: urlString,
  };
}
