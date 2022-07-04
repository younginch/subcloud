import {
  handleRoute,
  ResRankingVideo,
  VideoWithRequest,
  RouteParams,
} from "../../../../../utils/types";
import { RankingVideo } from "../../../../../utils/ranking";

async function RankingVideoByRequest({
  req,
  res,
  prisma,
}: RouteParams<ResRankingVideo>) {
  const compareByRequests = (a: VideoWithRequest, b: VideoWithRequest) => {
    if (a._count.requests === b._count.requests)
      return b._count.points - a._count.points;
    return b._count.requests - a._count.requests;
  };
  await RankingVideo({ req, res, prisma }, compareByRequests);
}

export default handleRoute({ GET: RankingVideoByRequest });
