import {
  handleRoute,
  ResRankingUser,
  UserWithCount,
  RouteParams,
} from "../../../../../utils/types";
import { RankingUser } from "../../../../../utils/ranking";

async function RankingUserBySub({
  req,
  res,
  prisma,
}: RouteParams<ResRankingUser>) {
  const compareBySubs = (a: UserWithCount, b: UserWithCount) => {
    return b._count.subs - a._count.subs;
  };
  await RankingUser({ req, res, prisma }, compareBySubs);
}

export default handleRoute({ GET: RankingUserBySub });
