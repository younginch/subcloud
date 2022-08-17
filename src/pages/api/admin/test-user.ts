import { Role, User } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function getTestUsers({ res, prisma }: RouteParams<User[]>) {
  const users = await prisma.user.findMany({
    where: {
      role: Role.Test,
    },
  });
  return res.status(200).json(users);
}

async function createTestUsers({ req, res, prisma }: RouteParams<number>) {
  const min = Number(req.query.min);
  const max = Number(req.query.max);
  const range = Array.from({ length: max - min + 1 }, (_, k) => k + min);

  const array = range.map((id) => ({
    email: `test-${id}@younginch.com`,
    role: Role.Test,
  }));
  const users = await prisma.user.createMany({
    data: array,
  });
  return res.status(201).json(users.count);
}

async function deleteTestUsers({ req, res, prisma }: RouteParams<number>) {
  await prisma.user.findMany({
    where: {
      id: {
        in: req.body.ids,
      },
    },
  });
  // TODO: check if the user is a test user
  const deletedUsers = await prisma.user.deleteMany({
    where: {
      id: {
        in: req.body.ids,
      },
    },
  });
  return res.status(200).json(deletedUsers.count);
}

export default handleRoute(
  { GET: getTestUsers, POST: createTestUsers, DELETE: deleteTestUsers },
  { role: Role.Admin }
);
