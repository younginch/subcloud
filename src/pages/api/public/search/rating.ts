import { Rating } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../../utils/types";

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
  return res.json(review.slice(0, parseInt(cnt as string, 10)));
}

export default handleRoute({
  GET: GetRating,
});
