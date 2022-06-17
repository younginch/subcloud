import { Role, Withdraw } from "@prisma/client";
import { handleRoute, RouteParams } from "../../utils/types";

async function getWithdraws({ res, prisma, session }: RouteParams<Withdraw[]>) {
  const withdraws = await prisma.withdraw.findMany({
    where: {
      userId: session?.user.id!,
    },
  });
  return res.status(200).json(withdraws);
}

async function createWithdraw({
  req,
  res,
  prisma,
  session,
}: RouteParams<Withdraw>) {
  const point = Number(req.body.point);
  const createdWithdraw = await prisma.withdraw.create({
    data: {
      userId: session?.user.id!,
      point,
    },
  });
  return res.status(201).json(createdWithdraw);
}

export default handleRoute(
  { GET: getWithdraws, POST: createWithdraw },
  { role: Role.User }
);
