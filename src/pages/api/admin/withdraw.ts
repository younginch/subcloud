import { Role, Withdraw } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function getWithdraws({ res, prisma }: RouteParams<Withdraw[]>) {
  const withdraws = await prisma.withdraw.findMany({
    include: {
      user: true,
    },
  });
  return res.status(200).json(withdraws);
}

export default handleRoute({ GET: getWithdraws }, { role: Role.Admin });
