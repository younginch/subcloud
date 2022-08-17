/* eslint-disable no-await-in-loop */
import { Role, Video } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function RequestCreate({ req, res, prisma }: RouteParams<Video>) {
  const { userList, videoId, count, language } = req.body;
  if (userList.length < count) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Wrong Input" });
  }
  const video = await prisma.video.findUnique({
    where: { videoId },
  });
  if (!video) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Wrong Input" });
  }
  const { serviceId } = video;
  const shuffled = [...userList].sort(() => 0.5 - Math.random());
  // eslint-disable-next-line no-restricted-syntax
  for (const userId of shuffled.slice(0, Number(count))) {
    const lang = language as string;
    const request = await prisma.request.findUnique({
      where: {
        serviceId_videoId_lang: { serviceId, videoId, lang },
      },
    });
    if (request) {
      await prisma.request.update({
        where: {
          serviceId_videoId_lang: { serviceId, videoId, lang },
        },
        data: {
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } else {
      await prisma.request.create({
        data: {
          video: { connect: { serviceId_videoId: { serviceId, videoId } } },
          lang,
          users: { connect: { id: userId } },
        },
      });
    }
  }
  return res.status(200).json(video);
}

export default handleRoute(
  {
    POST: RequestCreate,
  },
  { role: Role.Admin }
);
