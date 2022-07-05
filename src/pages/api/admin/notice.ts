import { Role, Notification, Notice } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function getNotices({ req, res, prisma }: RouteParams<Notice[]>) {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
    include: { notifications: true },
  });
  return res.status(201).json(notices);
}

async function createNotice({ req, res, prisma }: RouteParams<Notice>) {
  const { message } = req.body;
  const notice = await prisma.notice.create({
    data: {
      type: "Announce",
      message,
    },
  });
  const users = await prisma.user.findMany({});
  users.map(async (user) => {
    await prisma.notification.create({
      data: {
        userId: user.id,
        noticeId: notice.id,
        checked: false,
      },
    });
  });
  return res.status(201).json(notice);
}

async function updateNotice({ req, res, prisma }: RouteParams<Notice>) {
  const { id, message } = req.body;
  const notice = await prisma.notice.findUnique({
    where: { id: id as string },
  });
  if (!notice) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Notice" });
  }
  const updatedNotice = await prisma.notice.update({
    where: { id: id as string },
    data: { message },
  });
  return res.status(200).json(updatedNotice);
}

async function deleteNotice({ req, res, prisma }: RouteParams<Notice>) {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "id" });
  }
  const notice = await prisma.notice.findUnique({
    where: { id: id as string },
  });
  if (!notice) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Notice" });
  }
  const deletedNotice = await prisma.notice.delete({
    where: { id: id as string },
  });
  return res.status(200).json(deletedNotice);
}

export default handleRoute(
  {
    GET: getNotices,
    POST: createNotice,
    PATCH: updateNotice,
    DELETE: deleteNotice,
  },
  { role: Role.Admin }
);
