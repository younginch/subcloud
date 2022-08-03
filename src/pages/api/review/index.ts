import { Review, ReviewContent, Role } from "@prisma/client";
import { ReviewCreateSchema } from "../../../utils/schema";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function GetReview({
  req,
  res,
  prisma,
}: RouteParams<(Review & { reviewContents: ReviewContent[] })[]>) {
  const subId = req.query.subId as string;
  const reviews = await prisma.review.findMany({
    where: { subId },
    include: { reviewContents: true },
    orderBy: { createdAt: "desc" },
  });
  if (reviews.length === 0) {
    const newReview = await prisma.review.create({
      data: {
        subId,
        status: "Pending",
      },
      include: { reviewContents: true },
    });
    return res.status(200).json([newReview]);
  }
  return res.status(200).json(reviews);
}

async function CreateReview({
  req,
  res,
  prisma,
  session,
}: RouteParams<ReviewContent>) {
  const { value, error } = ReviewCreateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  await prisma.review.update({
    where: { id: req.query.reviewId as string },
    data: { status: "InReview" },
  });
  await prisma.sub.update({
    where: { id: req.query.subId as string },
    data: { status: "InReview" },
  });
  const createdReviewContent = await prisma.reviewContent.create({
    data: {
      reviewId: req.query.reviewId as string,
      reviewerId: session?.user.id!,
      type: value.type,
      content: value.content,
      startTime: value.startTime,
      endTime: value.endTime,
    },
  });
  return res.status(201).json(createdReviewContent);
}

async function DeleteReview({ req, res, prisma }: RouteParams<ReviewContent>) {
  const id = req.query.id as string;
  const reviewContent = await prisma.reviewContent.delete({
    where: { id },
  });
  return res.status(200).json(reviewContent);
}

export default handleRoute(
  { GET: GetReview, POST: CreateReview, DELETE: DeleteReview },
  { role: Role.Reviewer }
);
