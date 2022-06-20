import { Rating, Role } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function GetRating({ req, res, prisma }: RouteParams<Rating[]>) {
  const { userId, cnt } = req.query;
  const review = await prisma.rating.findMany({
    where: {
      sub: { userId: userId as string },
    },
    include: { user: true },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return res.json(review.slice(0, parseInt(cnt as string)));
}

export default handleRoute(
  {
    GET: GetRating,
  },
  { role: Role.User }
);
