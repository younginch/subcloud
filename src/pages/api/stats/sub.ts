import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";
import { Role } from "@prisma/client";

async function SubStatsRead({ req, res, prisma }: RouteParams<Array<number>>) {
  const { userId, cnt, date } = req.query;
  const subs = await prisma.sub.findMany({
    where: { userId: userId as string },
  });
  const count = parseInt(cnt as string);
  if (!subs) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  const currentDate = new Date(date as string);
  const subCountArray = new Array<number>(count).fill(0);
  for (let i = 0; i < subs.length; i += 1) {
    const day = currentDate.getDate() - subs[i].createdAt.getDate();
    if (day >= 0 && day < count) {
      subCountArray[day] += 1;
    }
  }
  return res.status(200).json(subCountArray);
}

export default handleRoute({ GET: SubStatsRead }, { role: Role.User });
