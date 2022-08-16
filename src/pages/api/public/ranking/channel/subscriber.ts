import {
  handleRoute,
  ResRankingChannel,
  ChannelWithCount,
  RouteParams,
} from "../../../../../utils/types";
import { RankingChannel } from "../../../../../utils/ranking";

async function RankingChannelBySubscribers({
  req,
  res,
  prisma,
}: RouteParams<ResRankingChannel>) {
  const compareBySubscribers = (a: ChannelWithCount, b: ChannelWithCount) =>
    b.subscriberCount - a.subscriberCount;
  await RankingChannel({ req, res, prisma }, compareBySubscribers);
}

export default handleRoute({ GET: RankingChannelBySubscribers });
