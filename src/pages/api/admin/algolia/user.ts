import { Role } from "@prisma/client";
import { saveUserToAlgolia } from "../../../../utils/algolia";
import { handleRoute, RouteParams } from "../../../../utils/types";

async function saveUserIndex({ res, prisma }: RouteParams<void>) {
  const users = await prisma.user.findMany();
  users.forEach((user) => {
    saveUserToAlgolia(user);
  });
  res.status(200).json();
}

export default handleRoute({ POST: saveUserIndex }, { role: Role.Admin });
