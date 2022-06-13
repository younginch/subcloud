import { Review, Role } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

async function GetReview({ req, res, prisma }: RouteParams<Review[]>) {
  const subId = req.query.subId as string;
  const review = await prisma.review.findMany({
    where: {
      subId,
    },
  });
  return res.json(review);
}

async function CreateReview({ req, res, prisma }: RouteParams<Review>) {
  const review = req.body as Review;
  const createdReview = await prisma.review.create({
    data: {
      ...review,
    },
  });
  return res.json(createdReview);
}

async function DeleteReview({ req, res, prisma }: RouteParams<Review>) {
  const id = req.query.id as string;
  const review = await prisma.review.delete({
    where: {
      id,
    },
  });
  return res.json(review);
}

export default handleRoute(
  { GET: GetReview, POST: CreateReview, DELETE: DeleteReview },
  { role: Role.Reviewer }
);
