import { PrismaClient, Video } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import ResError, { VideoWithInfo } from "../../../utils/types";

export default async function VideoRead(
  req: NextApiRequest,
  res: NextApiResponse<any | ResError>
) {
  const serviceId = req.query.ids[0];
  const videoId = req.query.ids[1];
  if (!serviceId || !videoId) {
    return res.status(400).json({ error: "Missing id" });
  }
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    try {
      let video = await prisma.video.findUnique({
        where: { serviceId_videoId: { serviceId, videoId } },
      });
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      let info;
      if (video.serviceId === "youtube") {
        info = await prisma.infoYoutube.findUnique({
          where: { id: video.videoId },
        });
      }
      return res.status(200).json({ ...video, info });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }
}
