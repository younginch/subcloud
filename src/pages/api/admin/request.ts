/* eslint-disable no-await-in-loop */
import { Role, Video } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function RequestCreate({ req, res, prisma }: RouteParams<Video>) {
  const { userList, videoId, count, language, percent, totalPoint } = req.body;
  if (userList.length < count || percent > 100 || percent < 0) {
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
  const lang = language as string;
  let request = await prisma.request.findUnique({
    where: {
      serviceId_videoId_lang: { serviceId, videoId, lang },
    },
  });
  if (!request) {
    request = await prisma.request.create({
      data: {
        video: { connect: { serviceId_videoId: { serviceId, videoId } } },
        lang,
      },
    });
  }
  const goalPoint = Math.round((totalPoint * percent) / 100);
  const users = shuffled.slice(0, count);
  if (request.point < goalPoint) {
    await prisma.requestPoint.create({
      data: {
        userId: users[0],
        requestId: request.id,
        point: goalPoint - request.point,
      },
    });
    // eslint-disable-next-line no-restricted-syntax
    for await (const userId of users) {
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
          point: goalPoint,
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
