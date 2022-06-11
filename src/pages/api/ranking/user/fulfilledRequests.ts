import {
  handleRoute,
  ResRankingUser,
  UserWithCount,
  RouteParams,
} from "../../../../utils/types";
import { RankingUser } from "../../../../utils/ranking";

async function RankingUserByFulfilledRequests({
  req,
  res,
  prisma,
}: RouteParams<ResRankingUser>) {
  const compareByFulfilledRequests = (a: UserWithCount, b: UserWithCount) => {
    return b._count.fulfilledRequests - a._count.fulfilledRequests;
  };
  await RankingUser({ req, res, prisma }, compareByFulfilledRequests);
}

export default handleRoute({ GET: RankingUserByFulfilledRequests });
