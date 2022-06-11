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
  const { start, end } = req.query;
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
        _count: {
          subs: user.subs.length,
          views: user.subs.reduce((prev, curr) => prev + curr.views, 0),
          fulfilledRequests: user.subs.reduce(
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
            user.subs.length > 0
              ? user.subs.reduce(
                  (prevSub, currSub) =>
                    prevSub +
                    (currSub.ratings.length > 0
                      ? currSub.ratings.reduce(
                          (prevRating, currRating) =>
                            prevRating + currRating.score,
                          0
                        ) / currSub.ratings.length
                      : 0),
                  0
                ) / user.subs.length
              : 0,
        },
      };
    })
    .sort(sortBy);

  return res.status(200).json(newUsers.slice(Number(start), Number(end)));
}

export async function RankingVideo(
  { req, res, prisma }: RouteParams<ResRankingVideo>,
  sortBy: (a: VideoWithRequest, b: VideoWithRequest) => number
) {
  const { lang, start, end } = req.query;
  if (!start && !end) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "FormInvalidated" });
  }
  let where: any = {};
  const isLang = lang && lang !== "All Lang";
  if (isLang) {
    where = {
      requests: {
        some: {
          lang: lang,
        },
      },
    };
  }
  const videos = await prisma.video.findMany({
    where,
    include: {
      requests: {
        include: { users: true },
      },
      youtubeVideo: { include: { channel: true } },
    },
  });
  const newVideos = videos
    .map((video) => {
      const requests = video.requests.filter(
        (request) => !isLang || request.lang === lang
      );
      return {
        url: video.url,
        serviceId: video.serviceId,
        videoId: video.videoId,
        youtubeVideoId: video.youtubeVideoId,
        youtubeVideo: video.youtubeVideo,
        _count: {
          requests: requests.reduce(
            (prev, curr) => prev + curr.users.length,
            0
          ),
          points: requests.reduce((prev, curr) => prev + curr.point, 0),
        },
        langs: requests
          .slice(1)
          .reduce((prev, curr) => prev + ", " + curr.lang, requests[0].lang),
      };
    })
    .sort(sortBy);
  if (!videos) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingVideoByRequest" });
  }
  return res.status(200).json(newVideos.slice(Number(start), Number(end)));
}
