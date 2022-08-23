import { Session } from "next-auth";
import { NextApiResponse } from "next";
import { Request, Role } from "@prisma/client";
import {
  handleRoute,
  ResRequest,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";
import { RequestCreateSchema } from "../../../../utils/schema";
import prisma from "../../../../utils/prisma";

async function RequestRead({ req, res, prisma }: RouteParams<ResRequest>) {
  if (!req.query.id) {
    return res
      .status(400)
      .json({ error: SubErrorType.Validation, message: "No id provided" });
  }
  const request = await prisma.request.findUnique({
    where: { id: req.query.id as string },
  });
  if (!request) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Request" });
  }
  return res.status(200).json(request);
}

async function updatePointAndResponse(
  session: Session | undefined,
  res: NextApiResponse,
  request: Request,
  requestPoint: number = 0,
  fundPoint: number = 0
): Promise<void> {
  if (requestPoint !== 0) {
    await prisma.user.update({
      where: { id: session?.user.id },
      data: { point: (session?.user.point ?? 0) - fundPoint },
    });
    await prisma.request.update({
      where: { id: request.id },
      data: { point: request.point + requestPoint },
    });
    await prisma.requestPoint.create({
      data: {
        userId: session?.user.id!,
        requestId: request.id,
        point: fundPoint,
      },
    });
  }
}

async function RequestCreate({
  req,
  res,
  prisma,
  session,
}: RouteParams<ResRequest>) {
  const { value, error } = RequestCreateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  const { serviceId, videoId, lang, requestPoint, fundPoint } = value;
  if (session?.user.point! < fundPoint) {
    return res.status(400).json({
      error: SubErrorType.InvalidRequest,
      message: "Insufficient Point",
    });
  }
  const request = await prisma.request.findUnique({
    where: { serviceId_videoId_lang: { serviceId, videoId, lang } },
    include: { users: { where: { id: session?.user.id } } },
  });
  if (request) {
    const updatedRequest = await prisma.request.update({
      where: { serviceId_videoId_lang: { serviceId, videoId, lang } },
      data: {
        users: {
          connect: {
            id: session?.user.id,
          },
        },
      },
    });
    updatePointAndResponse(
      session,
      res,
      updatedRequest,
      requestPoint,
      fundPoint
    );
    const finalRequest = await prisma.request.findUnique({
      where: { id: updatedRequest.id },
    });
    return res.status(200).json(finalRequest!);
  }
  const createdRequest = await prisma.request.create({
    data: {
      video: { connect: { serviceId_videoId: { serviceId, videoId } } },
      lang,
      users: { connect: { id: session?.user?.id } },
    },
  });
  updatePointAndResponse(session, res, createdRequest, requestPoint, fundPoint);
  const finalRequest = await prisma.request.findUnique({
    where: { id: createdRequest.id },
  });
  return res.status(201).json(finalRequest!);
}

async function RequestDelete({
  req,
  res,
  prisma,
  session,
}: RouteParams<ResRequest>) {
  if (!req.query.id) {
    return res
      .status(400)
      .json({ error: SubErrorType.Validation, message: "No id provided" });
  }
  const request = await prisma.request.findUnique({
    where: { id: req.query.id as string },
  });
  if (!request) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Request" });
  }
  const requestPoints = await prisma.requestPoint.findMany({
    where: {
      requestId: request.id,
      userId: session?.user.id,
    },
  });
  const returnPoint = requestPoints.reduce(
    (prev, curr) => prev + curr.point,
    0
  );
  await prisma.requestPoint.deleteMany({
    where: {
      requestId: request.id,
      userId: session?.user.id,
    },
  });
  await prisma.user.update({
    where: { id: session?.user.id },
    data: { point: (session?.user.point ?? 0) + returnPoint },
  });
  const updatedRequest = await prisma.request.update({
    where: { id: request.id },
    data: {
      users: {
        disconnect: {
          id: session?.user.id,
        },
      },
      point: request.point - returnPoint,
    },
  });
  return res.status(200).json(updatedRequest);
}

export default handleRoute(
  { GET: RequestRead, POST: RequestCreate, DELETE: RequestDelete },
  { role: Role.User }
);
