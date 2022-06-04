import {
  handleRoute,
  ResRankingUser,
  UserWithCount,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";

async function RankingUserByView({
  req,
  res,
  prisma,
}: RouteParams<ResRankingUser>) {
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
        },
      },
    },
  });
  if (!users) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "RankingSubView" });
  }
  const compareByViews = (a: UserWithCount, b: UserWithCount) => {
    return b._count.views - a._count.views;
  };
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
          fullfill: user.subs.reduce(
            (prev, curr) =>
              prev +
              curr.video.requests.reduce(
                (p, c) => p + (c.lang === curr.lang ? c.users.length : 0),
                0
              ),
            0
          ),
        },
      };
    })
    .sort(compareByViews);

  return res.status(200).json(newUsers.slice(Number(start), Number(end)));
}

export default handleRoute({ GET: RankingUserByView });
