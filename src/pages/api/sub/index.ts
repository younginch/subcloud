import { Sub } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";
import { SubCreateSchema } from "../../../utils/schema";

async function SubCreate({ req, res, prisma, session }: RouteParams<Sub>) {
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
    return res.status(409).json({
      error: SubErrorType.InvalidRequest,
      message: "Sub already exists",
    });
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

export default handleRoute({ POST: SubCreate }, { useSession: true });
