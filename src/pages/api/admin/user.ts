import { Order, Role, Sub, SubHistory, User, Request } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

type UserWithDetail = User & {
  subs: Sub[];
  requests: Request[];
  orders: Order[];
  subHistories: SubHistory[];
};

async function UserGet({
  req,
  res,
  prisma,
}: RouteParams<User[] | UserWithDetail>) {
  if (req.query.id) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: req.query.id as string },
      include: {
        subs: true,
        requests: true,
        orders: true,
        subHistories: true,
      },
    });
    return res.status(200).json(user);
  }
  const users = await prisma.user.findMany({
    where: { NOT: { role: Role.Test } },
  });
  return res.json(users);
}

async function UserUpdate({ req, res, prisma }: RouteParams<User>) {
  if (!req.query.id) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "id is required" });
  }
  const user = await prisma.user.update({
    where: { id: req.query.id as string },
    data: req.body,
  });
  return res.status(200).json(user);
}

async function UserDelete({ req, res, prisma }: RouteParams<User>) {
  if (!req.query.id) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "id is required" });
  }
  const user = await prisma.user.delete({
    where: { id: req.query.id as string },
  });
  return res.status(200).json(user);
}

export default handleRoute(
  {
    GET: UserGet,
    PATCH: UserUpdate,
    DELETE: UserDelete,
  },
  { role: Role.Admin }
);
