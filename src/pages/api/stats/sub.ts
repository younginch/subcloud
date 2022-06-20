import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";
import { Role } from "@prisma/client";
import dayjs, { OpUnitType } from "dayjs";

async function SubStatsRead({ req, res, prisma }: RouteParams<Array<number>>) {
  const { userId, cnt, date, type } = req.query;
  const subs = await prisma.sub.findMany({
    where: { userId: userId as string },
  });
  const count = parseInt(cnt as string);
  if (!subs) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  const dateType = type as OpUnitType;
  const currentDay = dayjs(date as string).startOf(dateType);
  const subCountArray = new Array<number>(count).fill(0);
  for (let i = 0; i < subs.length; i += 1) {
    const dayDiff = currentDay.diff(
      dayjs(subs[i].createdAt).startOf(dateType),
      dateType
    );
    if (dayDiff >= 0 && dayDiff < count) {
      subCountArray[dayDiff] += 1;
    }
  }
  return res.status(200).json(subCountArray);
}

export default handleRoute({ GET: SubStatsRead }, { role: Role.User });
