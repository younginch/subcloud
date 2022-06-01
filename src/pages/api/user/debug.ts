import { Role, User } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function UserDebug({ req, res, prisma }: RouteParams<User>) {
  const user = await prisma.user.update({
    where: { id: req.body.id as string },
    data: { role: Role.Admin },
  });
  return res.status(200).json(user);
}

export default handleRoute(
  { PATCH: UserDebug },
  { role: Role.User, debugOnly: true }
);
