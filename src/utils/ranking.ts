import { PointGoal } from "./etc";
import {
  ResRankingUser,
  ResRankingVideo,
  ResRankingChannel,
  RouteParams,
  SubErrorType,
  UserWithCount,
  VideoWithRequest,
  ChannelWithCount,
} from "./types";

export async function RankingUser(
  { req, res, prisma }: RouteParams<ResRankingUser>,
  sortBy: (a: UserWithCount, b: UserWithCount) => number
) {
  const { start, end, order, lang } = req.query;
  if (!start && !end) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "FormInvalidated" });
  }
  let where: any = {};
  const isLang = lang && lang !== "All Lang";
  if (isLang) {
    where = {
      subs: {
        some: {
          lang: lang as string,
        },
      },
    };
  }
  const users = await prisma.user.findMany({
    where,
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
      const langsMap = new Map();
      for (let i = 0; i < subs.length; i += 1) {
        const { lang } = subs[i];
        const num = langsMap.get(lang);
        if (num) langsMap.set(lang, num + 1);
        else langsMap.set(lang, 1);
      }
      const sortLangsMap = new Map([...langsMap].sort((a, b) => b[1] - a[1]));
      const langs = [...sortLangsMap.keys()];
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
          langs,
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
  const { lang, start, end, order, goalExpr, channelId } = req.query;
  const goalObject = goalExpr ? JSON.parse(goalExpr as string) : undefined;
  if (!start && !end) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "FormInvalidated" });
  }
  const where: any = {};
  const isLang = lang && lang !== "All Lang";
  if (isLang) {
    where.lang = lang as string;
  }
  if (channelId) {
    where.video = {
      youtubeVideo: {
        channelId: channelId as string,
      },
    };
  }
  const requests = await prisma.request.findMany({
    where,
    include: {
      video: { include: { youtubeVideo: { include: { channel: true } } } },
      users: true,
    },
  });
  const videos = requests
    .filter((request) => request.users.length > 0)
    .map((request) => ({
      url: request.video.url,
      serviceId: request.video.serviceId,
      videoId: request.video.videoId,
      youtubeVideoId: request.video.youtubeVideoId,
      youtubeVideo: request.video.youtubeVideo,
      _count: {
        requests: request.users.length,
        points: request.point,
        gauge:
          request.point /
          (goalObject
            ? PointGoal(
                request.video.youtubeVideo
                  ? request.video.youtubeVideo.duration
                  : undefined,
                goalObject
              ) ?? 1000000
            : 1000000),
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

export async function RankingChannel(
  { req, res, prisma }: RouteParams<ResRankingChannel>,
  sortBy: (a: ChannelWithCount, b: ChannelWithCount) => number
) {
  const { start, end, order } = req.query;
  if (!start && !end) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "FormInvalidated" });
  }
  const channels = await prisma.youtubeChannel.findMany({
    include: {
      videos: {
        include: {
          video: {
            include: { requests: { include: { users: true } }, subs: true },
          },
        },
      },
    },
  });
  if (!channels) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingChannel" });
  }
  const newChannels = channels
    .map((channel) => ({
      _count: {
        subs: channel.videos.reduce(
          (prev, curr) => prev + (curr.video?.subs.length ?? 0),
          0
        ),
        requests: channel.videos.reduce(
          (prev, curr) =>
            prev +
            (curr.video?.requests.filter((request) => request.users.length > 0)
              .length ?? 0),
          0
        ),
      },
      ...channel,
    }))
    .filter((channel) => channel._count.requests > 0)
    .sort(sortBy);
  if ((order as string) === "asc") {
    return res
      .status(200)
      .json(newChannels.reverse().slice(Number(start), Number(end)));
  }
  return res.status(200).json(newChannels.slice(Number(start), Number(end)));
}
