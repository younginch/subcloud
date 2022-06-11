import { Role } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function AdminDelete({ res, prisma }: RouteParams<{}>) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ error: "Unauthorized in production" });
  }
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.verificationToken.deleteMany({});
  await prisma.video.deleteMany({});
  await prisma.exampleVideo.deleteMany({});
  await prisma.youtubeVideo.deleteMany({});
  await prisma.youtubeChannel.deleteMany({});
  await prisma.request.deleteMany({});
  await prisma.file.deleteMany({});
  await prisma.sub.deleteMany({});
  await prisma.subHistory.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.requestPoint.deleteMany({});
  return res.status(200).json({});
}

export default handleRoute(
  {
    GET: AdminDelete,
  },
  { role: Role.Admin, debugOnly: true }
);
