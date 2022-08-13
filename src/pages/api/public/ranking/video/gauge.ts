import {
  handleRoute,
  ResRankingVideo,
  VideoWithRequest,
  RouteParams,
} from "../../../../../utils/types";
import { RankingVideo } from "../../../../../utils/ranking";

async function RankingVideoByGauge({
  req,
  res,
  prisma,
}: RouteParams<ResRankingVideo>) {
  const compareByRequests = (a: VideoWithRequest, b: VideoWithRequest) => {
    if (a._count.gauge === b._count.gauge)
      return b._count.points - a._count.points;
    return b._count.gauge - a._count.gauge;
  };
  await RankingVideo({ req, res, prisma }, compareByRequests);
}

export default handleRoute({ GET: RankingVideoByGauge });
