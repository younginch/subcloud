import { Rating, Role } from "@prisma/client";
import { RatingCreateSchema, RatingUpdateSchema } from "../../../utils/schema";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function GetRating({ req, res, prisma }: RouteParams<Rating[]>) {
  const id = req.query.id as string;
  const review = await prisma.rating.findMany({
    where: {
      subId: id,
    },
  });
  return res.json(review);
}

async function CreateRating({
  req,
  res,
  prisma,
  session,
}: RouteParams<Rating>) {
  const { value, error } = RatingCreateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  const sub = await prisma.sub.findUnique({
    where: { id: value.subId },
  });
  if (!sub) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "No sub" });
  }
  if (sub.userId === session?.user.id) {
    return res.status(400).json({
      error: SubErrorType.FormValidation,
      message: "Cannot rate own sub",
    });
  }
  const rating = await prisma.rating.findUnique({
    where: {
      subId_userId: {
        subId: value.subId,
        userId: session?.user.id!,
      },
    },
  });
  if (rating) {
    return res.status(409).json(rating);
  }
  const createdRating = await prisma.rating.create({
    data: {
      user: { connect: { id: session?.user.id } },
      sub: { connect: { id: value.subId } },
      score: value.score,
      comment: value.comment,
    },
  });
  const notice = await prisma.notice.create({
    data: {
      type: "Review",
      message: value.comment,
      rating: { connect: { id: createdRating.id } },
    },
  });
  await prisma.notification.create({
    data: {
      userId: sub.userId,
      noticeId: notice.id,
      checked: false,
    },
  });
  return res.status(201).json(createdRating);
}

async function UpdateRating({ req, res, prisma }: RouteParams<Rating>) {
  const { value, error } = RatingUpdateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  const rating = await prisma.rating.findUnique({
    where: { id: value.id as string },
  });
  if (!rating) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: "No rating" });
  }
  const updatedRating = await prisma.rating.update({
    where: { id: value.id as string },
    data: {
      score: value.score,
      comment: value.comment,
    },
  });
  return res.status(200).json(updatedRating);
}

async function DeleteRating({ req, res, prisma }: RouteParams<Rating>) {
  const id = req.query.id as string;
  const rating = await prisma.rating.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(rating);
}

export default handleRoute(
  {
    GET: GetRating,
    POST: CreateRating,
    PATCH: UpdateRating,
    DELETE: DeleteRating,
  },
  { role: Role.User }
);
