import { Role, User } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function UserGet({ res, prisma }: RouteParams<User[]>) {
  const users = await prisma.user.findMany();
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
  { role: Role.ADMIN }
);
