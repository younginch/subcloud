import { User } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function UserSession({ res, prisma, session }: RouteParams<User>) {
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  if (!user) {
    return res.status(404).json({
      error: SubErrorType.NotFound,
      message: "User not found",
    });
  }
  return res.status(200).json(user);
}

export default handleRoute({ GET: UserSession });
