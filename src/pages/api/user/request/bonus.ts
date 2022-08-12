import { Role } from "@prisma/client";
import {
  handleRoute,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";

async function RequestRead({
  req,
  res,
  prisma,
  session,
}: RouteParams<Boolean>) {
  const { serviceId, videoId, lang } = req.query;
  if (!serviceId || !videoId || !lang) {
    return res
      .status(400)
      .json({ error: SubErrorType.Validation, message: "No id provided" });
  }
  const request = await prisma.request.findUnique({
    where: {
      serviceId_videoId_lang: {
        serviceId: serviceId as string,
        videoId: videoId as string,
        lang: lang as string,
      },
    },
    select: { users: true },
  });
  if (!request) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Request" });
  }
  if (request.users.find((user) => user.id === session?.user.id))
    return res.status(200).json(false);
  return res.status(200).json(true);
}

export default handleRoute({ GET: RequestRead }, { role: Role.User });
