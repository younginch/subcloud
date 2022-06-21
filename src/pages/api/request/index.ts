import {
  handleRoute,
  ResRequest,
  RouteParams,
  SubErrorType,
} from "../../../utils/types";
import { RequestCreateSchema } from "../../../utils/schema";
import { Session } from "next-auth";
import { NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { Request, Role } from "@prisma/client";

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
  const { serviceId, videoId, lang } = value;
  const request = await prisma.request.findUnique({
    where: { serviceId_videoId_lang: { serviceId, videoId, lang } },
    include: { users: { where: { id: session?.user.id } } },
  });
  if (request) {
    if (
      request.users.find((user) => user.id === session?.user.id) &&
      value.point === 0
    ) {
      return res.status(409).json({
        error: SubErrorType.InvalidRequest,
        message: "You already requested this video",
      });
    }
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
    updatePointAndResponse(value.point, session, res, updatedRequest);
    const finalRequest = await prisma.request.findUnique({
      where: { id: updatedRequest.id },
    });
    return res.status(200).json(finalRequest!);
  }
  const createdRequest = await prisma.request.create({
    data: {
      video: { connect: { serviceId_videoId: { serviceId, videoId } } },
      lang: lang,
      users: { connect: { id: session?.user?.id } },
    },
  });
  updatePointAndResponse(value.point, session, res, createdRequest);
  const finalRequest = await prisma.request.findUnique({
    where: { id: createdRequest.id },
  });
  return res.status(201).json(finalRequest!);
}

async function updatePointAndResponse(
  requestedPoint: number = 0,
  session: Session | undefined,
  res: NextApiResponse,
  request: Request
): Promise<void> {
  if (requestedPoint !== 0) {
    if (session?.user.point! < requestedPoint) {
      return res.status(400).json({
        error: SubErrorType.InvalidRequest,
        message: "Insufficient Point",
      });
    }
    await prisma.user.update({
      where: { id: session?.user.id },
      data: { point: session?.user.point! - requestedPoint },
    });
    await prisma.request.update({
      where: { id: request.id },
      data: { point: request.point + requestedPoint },
    });
    await prisma.requestPoint.create({
      data: {
        userId: session?.user.id!,
        requestId: request.id,
        point: requestedPoint,
      },
    });
  }
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
  const updatedRequest = await prisma.request.update({
    where: { id: request.id },
    data: {
      users: {
        disconnect: {
          id: session?.user.id,
        },
      },
    },
  });
  return res.status(200).json(updatedRequest);
}

export default handleRoute(
  { GET: RequestRead, POST: RequestCreate, DELETE: RequestDelete },
  { role: Role.User }
);
