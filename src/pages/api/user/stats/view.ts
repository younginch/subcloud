import { Role } from "@prisma/client";
import dayjs, { OpUnitType } from "dayjs";
import {
  handleRoute,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";

async function ViewStatsRead({ req, res, prisma }: RouteParams<Array<number>>) {
  const { userId, subId, cnt, date, type } = req.query;
  const where: any = { userId: userId as string };
  if (subId) {
    where.id = subId as string;
  }
  const subs = await prisma.sub.findMany({
    where,
    include: { subHistories: true },
  });
  const count = parseInt(cnt as string, 10);
  if (subs === []) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  const dateType = type as OpUnitType;
  const currentDay = dayjs(date as string).startOf(dateType);
  const viewCountArray = new Array<number>(count).fill(0);
  for (let i = 0; i < subs.length; i += 1) {
    const history = subs[i].subHistories;
    for (let j = 0; j < history.length; j += 1) {
      const dayDiff = currentDay.diff(
        dayjs(history[j].viewAt).startOf(dateType),
        dateType
      );
      if (dayDiff >= 0 && dayDiff < count) {
        viewCountArray[dayDiff] += 1;
      }
    }
  }
  return res.status(200).json(viewCountArray.reverse());
}

export default handleRoute({ GET: ViewStatsRead }, { role: Role.User });
