import {
  ResRankingUser,
  ResRankingVideo,
  RouteParams,
  SubErrorType,
  UserWithCount,
  VideoWithRequest,
} from "./types";

export async function RankingUser(
  { req, res, prisma }: RouteParams<ResRankingUser>,
  sortBy: (a: UserWithCount, b: UserWithCount) => number
) {
  const { start, end, order } = req.query;
  if (!start && !end) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "FormInvalidated" });
  }
  const users = await prisma.user.findMany({
    include: {
      subs: {
        include: {
          video: { include: { requests: { include: { users: true } } } },
          ratings: true,
        },
      },
    },
  });
  if (!users) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingUserByView" });
  }
  const newUsers = users
    .filter((user) => user.subs.length > 0)
    .map((user) => {
      const subs = user.subs.filter((sub) => sub.status === "Approved");
      const ratedSubs = subs.filter((sub) => sub.ratings.length > 0);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        password: user.password,
        role: user.role,
        point: user.point,
        baseLangs: user.baseLangs,
        requestLangs: user.requestLangs,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        _count: {
          subs: subs.length,
          views: subs.reduce((prev, curr) => prev + curr.views, 0),
          fulfilledRequests: subs.reduce(
            (prevSub, currSub) =>
              prevSub +
              currSub.video.requests.reduce(
                (prevRequest, currRequest) =>
                  prevRequest +
                  (currRequest.lang === currSub.lang
                    ? currRequest.users.length
                    : 0),
                0
              ),
            0
          ),
          ratings:
            ratedSubs.length > 0
              ? ratedSubs.reduce(
                  (prevSub, currSub) =>
                    prevSub +
                    currSub.ratings.reduce(
                      (prevRating, currRating) => prevRating + currRating.score,
                      0
                    ) /
                      currSub.ratings.length,
                  0
                ) / ratedSubs.length
              : 0,
        },
      };
    })
    .sort(sortBy);
  if ((order as string) === "asc") {
    return res
      .status(200)
      .json(newUsers.reverse().slice(Number(start), Number(end)));
  }
  return res.status(200).json(newUsers.slice(Number(start), Number(end)));
}

export async function RankingVideo(
  { req, res, prisma }: RouteParams<ResRankingVideo>,
  sortBy: (a: VideoWithRequest, b: VideoWithRequest) => number
) {
  const { lang, start, end, order } = req.query;
  if (!start && !end) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "FormInvalidated" });
  }
  let where: any = {};
  const isLang = lang && lang !== "All Lang";
  if (isLang) {
    where = { lang: lang as string };
  }
  const requests = await prisma.request.findMany({
    where,
    include: {
      video: { include: { youtubeVideo: { include: { channel: true } } } },
      users: true,
    },
  });
  const videos = requests
    .map((request) => ({
      url: request.video.url,
      serviceId: request.video.serviceId,
      videoId: request.video.videoId,
      youtubeVideoId: request.video.youtubeVideoId,
      youtubeVideo: request.video.youtubeVideo,
      _count: {
        requests: request.users.length,
        points: request.point,
      },
      langs: request.lang,
    }))
    .sort(sortBy);
  if (!requests) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingVideoByRequest" });
  }
  if ((order as string) === "asc") {
    return res
      .status(200)
      .json(videos.reverse().slice(Number(start), Number(end)));
  }
  return res.status(200).json(videos.slice(Number(start), Number(end)));
}
