import { Review, Role } from "@prisma/client";
import { ReviewCreateSchema } from "../../../utils/schema";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function GetReview({ req, res, prisma }: RouteParams<Review[]>) {
  const subId = req.query.subId as string;
  const review = await prisma.review.findMany({
    where: {
      subId,
    },
  });
  return res.json(review);
}

async function CreateReview({
  req,
  res,
  prisma,
  session,
}: RouteParams<Review>) {
  const { value, error } = ReviewCreateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  const createdReview = await prisma.review.create({
    data: {
      subId: req.query.subId as string,
      reviewerId: session?.user.id!,
      type: value.type,
      content: value.content,
      startTime: value.startTime,
      endTime: value.endTime,
    },
  });
  return res.status(201).json(createdReview);
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
