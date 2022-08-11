import { Role, Sub, SubStatus } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function changeSub({ req, res, prisma }: RouteParams<Sub>) {
  const subId = req.query.subId as string;
  const { subStatus, reviewId } = req.body;

  const updatedSub = await prisma.sub.update({
    where: { id: subId },
    data: { status: subStatus },
  });
  const statusNotice = await prisma.notice.create({
    data: {
      type: "StatusChange",
      message: `Subtitle ${updatedSub.status}`,
      sub: { connect: { id: updatedSub.id } },
    },
  });
  await prisma.notification.create({
    data: {
      userId: updatedSub.userId,
      noticeId: statusNotice.id,
      checked: false,
    },
  });
  await prisma.review.update({
    where: { id: reviewId },
    data: {
      status: subStatus,
    },
  });
  if (subStatus === SubStatus.Approved) {
    const request = await prisma.request.findUnique({
      where: {
        serviceId_videoId_lang: {
          serviceId: updatedSub.serviceId,
          videoId: updatedSub.videoId,
          lang: updatedSub.lang,
        },
      },
      include: { video: true, users: true },
    });
    if (request) {
      await prisma.request.update({
        where: { id: request.id },
        data: { status: "Uploaded" },
        include: { users: true, video: true },
      });
      const requestNotice = await prisma.notice.create({
        data: {
          type: "Upload",
          message: "Subtitle uploaded",
          url: request.video.url,
          sub: { connect: { id: updatedSub.id } },
        },
      });
      request.users.map(async (user) => {
        await prisma.notification.create({
          data: {
            userId: user.id,
            noticeId: requestNotice.id,
            checked: false,
          },
        });
      });
    } else {
      await prisma.request.create({
        data: {
          video: {
            connect: {
              serviceId_videoId: {
                serviceId: updatedSub.serviceId,
                videoId: updatedSub.videoId,
              },
            },
          },
          lang: updatedSub.lang,
          status: "Uploaded",
        },
      });
    }
  }
  return res.status(200).json(updatedSub);
}

export default handleRoute({ POST: changeSub }, { role: Role.Reviewer });
