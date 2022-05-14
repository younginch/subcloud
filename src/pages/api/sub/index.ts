import {
  handleRoute,
  ResSub,
  ResSubRead,
  RouteParams,
  SubErrorType,
} from "../../../utils/types";
import { SubCreateSchema } from "../../../utils/schema";
import { configuredBucket, configuredS3 } from "../../../utils/aws";

async function SubCreate({ req, res, prisma, session }: RouteParams<ResSub>) {
  const { value, error } = SubCreateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  const sub = await prisma.sub.findUnique({
    where: {
      serviceId_videoId_lang_userId: {
        serviceId: value.serviceId,
        videoId: value.videoId,
        lang: value.lang,
        userId: session?.user.id!,
      },
    },
  });
  if (sub) {
    return res.status(409).json(sub);
  }
  const createdSub = await prisma.sub.create({
    data: {
      user: { connect: { id: session?.user.id } },
      file: { connect: { id: value.fileId } },
      video: {
        connect: {
          serviceId_videoId: {
            serviceId: value.serviceId,
            videoId: value.videoId,
          },
        },
      },
      lang: value.lang as string,
    },
  });
  return res.status(201).json(createdSub);
}

async function SubRead({ req, res, prisma }: RouteParams<ResSubRead>) {
  const { id } = req.query;
  const sub = await prisma.sub.findUnique({
    where: { id: id as string },
    include: { file: { select: { key: true } } },
  });
  if (!sub) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  const url = await configuredS3.getSignedUrlPromise("getObject", {
    Bucket: configuredBucket,
    Key: sub.file.key,
  });
  return res.status(200).json({ ...sub, url });
}

async function SubUpdate({ req, res, prisma }: RouteParams<ResSub>) {
  const { id } = req.body;
  const sub = await prisma.sub.findUnique({ where: { id: id as string } });
  if (!sub) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  const updatedSub = await prisma.sub.update({
    where: { id: id as string },
    data: {},
  });
  return res.status(200).json(updatedSub);
}

async function SubDelete({ req, res, prisma, session }: RouteParams<ResSub>) {
  const { id } = req.query;
  const sub = await prisma.sub.findUnique({ where: { id: id as string } });
  if (!sub) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  if (sub.userId !== session?.user.id) {
    return res.status(403).json({
      error: SubErrorType.NotUserSpecificAuthenticated,
      message: "Not authorized",
    });
  }
  const deletedSub = await prisma.sub.delete({
    where: { id: id as string },
  });
  return res.status(200).json(deletedSub);
}

export default handleRoute(
  { POST: SubCreate, GET: SubRead, PATCH: SubUpdate, DELETE: SubDelete },
  { useSession: true }
);
