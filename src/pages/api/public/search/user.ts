import {
  handleRoute,
  ResUserSearch,
  RouteParams,
  SubErrorType,
  UserWithCount,
} from "../../../../utils/types";

export async function UserSearch({
  req,
  res,
  prisma,
}: RouteParams<ResUserSearch>) {
  const { userId } = req.query;
  if (!userId) {
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
      .json({ error: SubErrorType.NotFound, message: "UserSearch" });
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
    });
  const userWithCount = newUsers.find((user) => user.id === userId);
  if (!userWithCount) {
    const unQualifiedUser = await prisma.user.findUnique({
      where: { id: userId as string },
    });
    if (!unQualifiedUser) {
      return res
        .status(404)
        .json({ error: SubErrorType.NotFound, message: "UserSearch" });
    }
    const unQualifiedUserWithPercentage = {
      ...unQualifiedUser,
      _count: {
        subs: 0,
        views: 0,
        fulfilledRequests: 0,
        ratings: 0,
        langs: [],
      },
      _percentage: {
        fulfilledRequest: 100,
        rating: 0,
        totalUser: newUsers.length,
      },
    };
    return res.status(200).json(unQualifiedUserWithPercentage);
  }
  const fulfilledRequestPercentage =
    (newUsers
      .sort(
        (a: UserWithCount, b: UserWithCount) =>
          b._count.fulfilledRequests - a._count.fulfilledRequests
      )
      .findIndex((user) => user.id === userId) /
      newUsers.length) *
    100;
  const ratingPercentage =
    (newUsers
      .sort(
        (a: UserWithCount, b: UserWithCount) =>
          b._count.ratings - a._count.ratings
      )
      .findIndex((user) => user.id === userId) /
      newUsers.length) *
    100;
  const userWithPercentage = {
    ...userWithCount,
    _percentage: {
      fulfilledRequest: fulfilledRequestPercentage,
      rating: ratingPercentage,
      totalUser: newUsers.length,
    },
  };
  return res.status(200).json(userWithPercentage);
}

export default handleRoute({ GET: UserSearch });
