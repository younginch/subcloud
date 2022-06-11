import {
  handleRoute,
  ResRankingUser,
  UserWithCount,
  RouteParams,
} from "../../../../utils/types";
import { RankingUser } from "../../../../utils/ranking";

async function RankingUserByView({
  req,
  res,
  prisma,
}: RouteParams<ResRankingUser>) {
  const compareByViews = (a: UserWithCount, b: UserWithCount) => {
    return b._count.views - a._count.views;
  };
  await RankingUser({ req, res, prisma }, compareByViews);
}

export default handleRoute({ GET: RankingUserByView });
