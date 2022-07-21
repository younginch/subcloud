import { Role, Settle } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function RecordGet({ res, prisma }: RouteParams<Settle[]>) {
  const records = await prisma.settle.findMany({
    include: { settlePoints: true },
  });
  return res.json(records);
}

async function RecordCreate({ req, res, prisma }: RouteParams<Settle>) {
  const { startAt, endAt, totalPoint } = req.body;
  const rawUsers = await prisma.user.findMany({
    include: {
      subs: {
        include: {
          video: { include: { requests: { include: { users: true } } } },
        },
      },
    },
  });
  const users = rawUsers.filter((user) => user.subs.length > 0);
  const userWithViews = users.map((user) => ({
    user,
    view: user.subs.reduce(
      (prevUser, currUser) => prevUser + currUser.views,
      0
    ),
  }));
  const totalView = userWithViews.reduce(
    (prevView, currView) => prevView + currView.view,
    0
  );
  const userWithPoints = userWithViews.map((userWithView) => ({
    user: userWithView.user,
    point: Math.floor((Number(totalPoint) / totalView) * userWithView.view),
  }));
  // eslint-disable-next-line no-restricted-syntax
  for (const userWithPoint of userWithPoints) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.user.update({
      where: { id: userWithPoint.user.id },
      data: {
        point: userWithPoint.user.point + userWithPoint.point,
      },
    });
  }
  const createdSettle = await prisma.settle.create({
    data: {
      totalPoint,
      startAt,
      endAt,
    },
  });
  userWithPoints.map(async (userWithPoint) => {
    await prisma.settlePoint.create({
      data: {
        userId: userWithPoint.user.id,
        settleId: createdSettle.id,
        point: userWithPoint.point,
      },
    });
  });
  return res.status(201).json(createdSettle);
}

async function RecordDelete({ req, res, prisma }: RouteParams<Settle>) {
  if (!req.query.id) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "id is required" });
  }
  const settle = await prisma.settle.delete({
    where: { id: req.query.id as string },
    include: { settlePoints: { include: { user: true } } },
  });
  settle.settlePoints.map(async (settlePoint) => {
    await prisma.user.update({
      where: { id: settlePoint.user.id },
      data: {
        point: settlePoint.user.point - settlePoint.point,
      },
    });
  });
  return res.status(200).json(settle);
}

export default handleRoute(
  {
    GET: RecordGet,
    POST: RecordCreate,
    DELETE: RecordDelete,
  },
  { role: Role.Admin }
);
