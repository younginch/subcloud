import { Sub } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";
import { SubCreateSchema } from "../../../utils/schema";

async function SubCreate({ req, res, prisma, session }: RouteParams<Sub>) {
  const { value, error } = SubCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sub = await prisma.sub.create({
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
  return res.status(201).json(sub);
}

export default handleRoute({ POST: SubCreate }, { useSession: true });
