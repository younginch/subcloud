import { Request } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";
import { RequestCreateSchema } from "../../../utils/schema";

async function RequestCreate({
  req,
  res,
  prisma,
  session,
}: RouteParams<Request>) {
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
    if (request.users.find((user) => user.id === session?.user.id)) {
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
    return res.status(200).json(updatedRequest);
  }
  const createdRequest = await prisma.request.create({
    data: {
      video: { connect: { serviceId_videoId: { serviceId, videoId } } },
      lang: lang,
      users: { connect: { id: session?.user?.id } },
    },
  });
  return res.status(201).json(createdRequest);
}

async function RequestRead({ req, res, prisma }: RouteParams<Request>) {
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

async function RequestDelete({
  req,
  res,
  prisma,
  session,
}: RouteParams<Request>) {
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
  { useSession: true }
);
