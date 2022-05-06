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

export default handleRoute({ POST: RequestCreate }, { useSession: true });
