import { User } from "@prisma/client";
import { RouteParams, SubErrorType } from "../../../utils/types";

export default async function UserSession({
  res,
  prisma,
  session,
}: RouteParams<User>) {
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
