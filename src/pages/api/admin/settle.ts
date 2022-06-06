import { Role, SettleRecord } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function RecordGet({ res, prisma }: RouteParams<SettleRecord[]>) {
  const records = await prisma.settleRecord.findMany();
  return res.json(records);
}

async function RecordCreate({ req, res, prisma }: RouteParams<SettleRecord>) {
  const { startAt, endAt, totalPoint } = req.body;
  const users = await prisma.user.findMany({
    include: {
      subs: {
        include: {
          video: { include: { requests: { include: { users: true } } } },
        },
      },
    },
  });
  const newUsers = users.filter((user) => user.subs.length > 0);
  const views = newUsers.map((user) => {
    return user.subs.reduce(
      (prevUser, currUser) => prevUser + currUser.views,
      0
    );
  });
  const totalView = views.reduce(
    (prevView, currView) => prevView + currView,
    0
  );
  const points = views.map((view) => {
    return (Number(totalPoint) / totalView) * view;
  });
  for (let i = 0; i < newUsers.length; i += 1) {
    await prisma.user.update({
      where: { id: newUsers[i].id },
      data: {
        point: newUsers[i].point + points[i],
      },
    });
  }
  const createdRecord = await prisma.settleRecord.create({
    data: {
      totalPoint,
      startAt,
      endAt,
      points,
      users: {
        connect: newUsers.map((user) => {
          return {
            id: user.id,
          };
        }),
      },
    },
  });
  return res.status(200).json(createdRecord);
}

async function RecordDelete({ req, res, prisma }: RouteParams<SettleRecord>) {
  if (!req.query.id) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "id is required" });
  }
  const record = await prisma.settleRecord.delete({
    where: { id: req.query.id as string },
  });
  return res.status(200).json(record);
}

export default handleRoute(
  {
    GET: RecordGet,
    POST: RecordCreate,
    DELETE: RecordDelete,
  },
  { role: Role.Admin }
);
