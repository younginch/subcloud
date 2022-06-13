import { Role, Sub } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function changeSub({ req, res, prisma }: RouteParams<Sub>) {
  const subId = req.query.subId as string;
  const subStatus = req.body.subStatus;

  const updatedSub = await prisma.sub.update({
    where: { id: subId },
    data: { status: subStatus },
  });

  return res.status(200).json(updatedSub);
}

export default handleRoute({ POST: changeSub }, { role: Role.Reviewer });
