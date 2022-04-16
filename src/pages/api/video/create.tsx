import { PrismaClient, Video } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ResError from "../../../utils/apiTypes";

export default async function VideoCreate(
  req: NextApiRequest,
  res: NextApiResponse<Video | ResError>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { url, lang } = req.body;
  if (!url || !lang) {
    return res.status(400).json({ error: "url and lang is required" });
  }
  const prisma = new PrismaClient();
  try {
    const video = await prisma.video.findUnique({ where: { url: url } });
    if (!video) {
      const createdVideo = await prisma.video.create({
        data: getVideoFromUrl(url, lang),
      });
      return res.status(201).json(createdVideo);
    }
    return res.status(200).json(video);
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function getVideoFromUrl(urlString: string, lang: string): Video {
  const url = new URL(urlString);
  if (url.hostname === "www.youtube.com") {
    const videoId = url.searchParams.get("v");
    return { id: `youtube-${videoId}`, type: "youtube", url: urlString, lang };
  }
  return {
    id: `${url.hostname}-${url.search}`,
    type: "unknown",
    url: urlString,
    lang,
  };
}
