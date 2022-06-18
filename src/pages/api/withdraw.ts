import { Role, Withdraw } from "@prisma/client";
import { WithdrawCreateSchema } from "../../utils/schema";
import { handleRoute, RouteParams, SubErrorType } from "../../utils/types";

async function getWithdraws({ res, prisma, session }: RouteParams<Withdraw[]>) {
  const withdraws = await prisma.withdraw.findMany({
    where: {
      userId: session?.user.id!,
    },
  });
  return res.status(200).json(withdraws);
}

async function createWithdraw({
  req,
  res,
  prisma,
  session,
}: RouteParams<Withdraw>) {
  const { value, error } = WithdrawCreateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: SubErrorType.FormValidation, message: error.message });
  }
  const createdWithdraw = await prisma.withdraw.create({
    data: {
      userId: session?.user.id!,
      point: value.point,
      bankName: value.bankName,
      accountNumber: value.accountNumber,
    },
  });
  return res.status(201).json(createdWithdraw);
}

export default handleRoute(
  { GET: getWithdraws, POST: createWithdraw },
  { role: Role.User }
);
