import {
  handleRoute,
  ResRankingChannel,
  ChannelWithCount,
  RouteParams,
} from "../../../../../utils/types";
import { RankingChannel } from "../../../../../utils/ranking";

async function RankingChannelBySubs({
  req,
  res,
  prisma,
}: RouteParams<ResRankingChannel>) {
  const compareBySubs = (a: ChannelWithCount, b: ChannelWithCount) =>
    b._count.subs - a._count.subs;
  await RankingChannel({ req, res, prisma }, compareBySubs);
}

export default handleRoute({ GET: RankingChannelBySubs });
