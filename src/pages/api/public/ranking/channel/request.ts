import {
  handleRoute,
  ResRankingChannel,
  ChannelWithCount,
  RouteParams,
} from "../../../../../utils/types";
import { RankingChannel } from "../../../../../utils/ranking";

async function RankingChannelByRequests({
  req,
  res,
  prisma,
}: RouteParams<ResRankingChannel>) {
  const compareByRequests = (a: ChannelWithCount, b: ChannelWithCount) =>
    b._count.requests - a._count.requests;
  await RankingChannel({ req, res, prisma }, compareByRequests);
}

export default handleRoute({ GET: RankingChannelByRequests });
