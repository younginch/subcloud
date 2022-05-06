import {
  handleRoute,
  RouteParams,
  SubErrorType,
  VideoWithInfo,
} from "../../../utils/types";

async function VideoRead({ req, res, prisma }: RouteParams<VideoWithInfo>) {
  const serviceId = req.query.ids[0];
  const videoId = req.query.ids[1];
  if (!serviceId || !videoId) {
    return res
      .status(400)
      .json({ error: SubErrorType.Validation, message: "id" });
  }
  let video = await prisma.video.findUnique({
    where: { serviceId_videoId: { serviceId, videoId } },
  });
  if (!video) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Video" });
  }
  let info;
  if (video.serviceId === "youtube") {
    info = await prisma.infoYoutube.findUnique({
      where: { id: video.videoId },
    });
  }
  return res.status(200).json({ ...video, info });
}

export default handleRoute({ GET: VideoRead });
