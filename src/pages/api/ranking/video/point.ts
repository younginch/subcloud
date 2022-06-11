import {
  handleRoute,
  ResRankingVideo,
  VideoWithRequest,
  RouteParams,
} from "../../../../utils/types";
import { RankingVideo } from "../../../../utils/ranking";

async function RankingVideoByRequest({
  req,
  res,
  prisma,
}: RouteParams<ResRankingVideo>) {
  const compareByPoints = (a: VideoWithRequest, b: VideoWithRequest) => {
    if (a._count.points === b._count.points)
      return b._count.requests - a._count.requests;
    return b._count.points - a._count.points;
  };
  await RankingVideo({ req, res, prisma }, compareByPoints);
}

export default handleRoute({ GET: RankingVideoByRequest });
