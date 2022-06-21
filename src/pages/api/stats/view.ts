import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";
import { Role } from "@prisma/client";
import dayjs from "dayjs";

async function ViewStatsRead({ req, res, prisma }: RouteParams<Array<number>>) {
  const { userId, cnt, date } = req.query;
  const subs = await prisma.sub.findMany({
    where: { userId: userId as string },
    include: { subHistories: true },
  });
  const count = parseInt(cnt as string);
  if (subs === []) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Sub" });
  }
  const currentDay = dayjs(date as string).get("date");
  const viewCountArray = new Array<number>(count).fill(0);
  for (let i = 0; i < subs.length; i += 1) {
    const history = subs[i].subHistories;
    for (let j = 0; j < history.length; j += 1) {
      const dayDiff = currentDay - dayjs(history[j].viewAt).get("date");
      if (dayDiff >= 0 && dayDiff < count) {
        viewCountArray[dayDiff] += 1;
      }
    }
  }
  return res.status(200).json(viewCountArray.reverse());
}

export default handleRoute({ GET: ViewStatsRead }, { role: Role.User });
