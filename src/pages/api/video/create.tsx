import { PrismaClient, Video } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import ResError from "../../../utils/apiTypes";
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
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }
  const { error } = VideoCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "url is invalid" });
  }
  const prisma = new PrismaClient();
  try {
    const video = await prisma.video.findUnique({
      where: { url: url },
      include: {
        subs: {
          include: { user: { select: { name: true } } },
        },
      },
    });
    if (!video) {
      const createdVideo = await prisma.video.create({
        data: getVideoFromUrl(url),
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

function getVideoFromUrl(urlString: string): Video {
  const url = new URL(urlString);
  if (url.hostname === "www.youtube.com") {
    const videoId = url.searchParams.get("v");
    return { id: `youtube.${videoId}`, type: "youtube", url: urlString };
  }
  return {
    id: `${url.hostname}.${url.search}`,
    type: "unknown",
    url: urlString,
  };
}
