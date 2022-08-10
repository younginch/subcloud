import {
  handleRoute,
  ResRankingUser,
  UserWithCount,
  RouteParams,
} from "../../../../../utils/types";
import { RankingUser } from "../../../../../utils/ranking";

async function RankingUserByRatings({
  req,
  res,
  prisma,
}: RouteParams<ResRankingUser>) {
  const compareByRatings = (a: UserWithCount, b: UserWithCount) =>
    b._count.ratings - a._count.ratings;
  await RankingUser({ req, res, prisma }, compareByRatings);
}

export default handleRoute({ GET: RankingUserByRatings });
