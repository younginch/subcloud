import { Sub } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function SubRead({ req, res, prisma }: RouteParams<Sub>) {
  const { id } = req.query;
  const sub = await prisma.sub.findUnique({ where: { id: id as string } });
  if (!sub) {
    return res.status(404).json({ error: "Sub not found" });
  }
  return res.status(200).json(sub);
}

async function SubUpdate({ req, res, prisma }: RouteParams<Sub>) {
  const { id } = req.body;
  const sub = await prisma.sub.findUnique({ where: { id: id as string } });
  if (!sub) {
    return res.status(404).json({ error: "Sub not found" });
  }
  const updatedSub = await prisma.sub.update({
    where: { id: id as string },
    data: {},
  });
  return res.status(200).json(updatedSub);
}

async function SubDelete({ req, res, prisma, session }: RouteParams<Sub>) {
  const { id } = req.query;
  const sub = await prisma.sub.findUnique({ where: { id: id as string } });
  if (!sub) {
    return res.status(404).json({ error: "Sub not found" });
  }
  if (sub.userId !== session?.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }
  const deletedSub = await prisma.sub.delete({
    where: { id: id as string },
  });
  return res.status(200).json(deletedSub);
}

export default handleRoute(
  { GET: SubRead, PATCH: SubUpdate, DELETE: SubDelete },
  { useSession: true }
);
