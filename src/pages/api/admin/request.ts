import { Role, Video } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function RequestCreate({ req, res, prisma }: RouteParams<Video[]>) {
  const { userList, videoList, countList, langList } = req.body;
  if (
    videoList.length !== countList.length ||
    videoList.length !== langList.length
  ) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Wrong Input" });
  }
  const videos = await videoList.map(async (videoUrl: string, i: number) => {
    const url = new URL(videoUrl);
    let id;
    if (url.pathname !== "/watch") {
      if (url.hostname === "youtu.be") {
        [, id] = url.pathname.split("/");
      }
      throw new Error("Not a video url");
    }
    id = url.searchParams.get("v") ?? undefined;
    const video = await prisma.video.findUnique({
      where: { videoId: id },
    });
    if (!video) {
      return res
        .status(404)
        .json({ error: SubErrorType.NotFound, message: "Wrong Input" });
    }
    const { serviceId, videoId } = video;
    const shuffled = [...userList].sort(() => 0.5 - Math.random());
    shuffled.slice(0, Number(countList[i])).forEach(async (userId: string) => {
      await prisma.request.update({
        where: {
          serviceId_videoId_lang: { serviceId, videoId, lang: langList[i] },
        },
        data: {
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
    });
    return video;
  });
  return res.status(200).json(videos);
}

export default handleRoute(
  {
    POST: RequestCreate,
  },
  { role: Role.Admin }
);
