import { Request } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function RequestRead({ req, res, prisma }: RouteParams<Request>) {
  if (!req.query.id) {
    return res.status(400).json({ error: "No id provided" });
  }
  const request = await prisma.request.findUnique({
    where: { id: req.query.id as string },
  });
  if (!request) {
    return res.status(404).json({ error: "Request not found" });
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
    return res.status(400).json({ error: "No id provided" });
  }
  const request = await prisma.request.findUnique({
    where: { id: req.query.id as string },
  });
  if (!request) {
    return res.status(404).json({ error: "Request not found" });
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
  { GET: RequestRead, DELETE: RequestDelete },
  { useSession: true }
);
