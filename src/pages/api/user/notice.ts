import { Role, Notification } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function getNotification({
  res,
  prisma,
  session,
}: RouteParams<Notification[]>) {
  const notifications = await prisma.notification.findMany({
    where: {
      userId: session?.user.id!,
    },
    orderBy: { notice: { createdAt: "desc" } },
    include: { notice: true },
  });
  return res.status(200).json(notifications);
}

async function updateNotification({
  req,
  res,
  prisma,
}: RouteParams<Notification>) {
  const { id } = req.body;
  const notification = await prisma.notification.findUnique({
    where: { id: id as string },
  });
  if (!notification) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  const updatedNotification = await prisma.notification.update({
    where: { id: id as string },
    data: {
      checked: true,
    },
  });
  return res.status(201).json(updatedNotification);
}

async function deleteNotification({
  req,
  res,
  prisma,
}: RouteParams<Notification>) {
  const { id } = req.body;
  const notification = await prisma.notification.delete({
    where: { id: id as string },
  });
  if (!notification) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Notification" });
  }
  return res.status(200).json(notification);
}

export default handleRoute(
  {
    GET: getNotification,
    PATCH: updateNotification,
    DELETE: deleteNotification,
  },
  { role: Role.User }
);
