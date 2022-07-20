import {
  Role,
  Subscription,
  SubscriptionStatus,
  SubscriptionType,
} from "@prisma/client";
import axios from "axios";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function getSubscription({
  req,
  res,
  prisma,
}: RouteParams<Subscription>) {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({
      error: SubErrorType.InvalidRequest,
      message: "Missing id",
    });
  }
  const subscription = await prisma.subscription.findUnique({
    where: { id },
  });
  if (!subscription) {
    return res.status(404).json({
      error: SubErrorType.NotFound,
      message: "Subscription not found",
    });
  }
  return res.status(200).json(subscription);
}

async function createSubscription({
  res,
  prisma,
  session,
}: RouteParams<Subscription>) {
  const userId = session?.user.id as string;
  const createdSubscription = await prisma.subscription.create({
    data: {
      type: SubscriptionType.MonthlyBasic,
      userId,
      customerKey: userId,
    },
  });
  return res.status(201).json(createdSubscription);
}

async function completeSubscription({
  req,
  res,
  prisma,
  session,
}: RouteParams<Subscription>) {
  const customerKey = req.query.customerKey as string;
  if (!customerKey) {
    return res.status(400).send({
      error: SubErrorType.InvalidRequest,
      message: "Missing customerKey",
    });
  }
  const authKey = req.body.authKey as string;
  if (!authKey) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "Missing authKey" });
  }
  try {
    const response = await axios.post(
      `https://api.tosspayments.com/v1/billing/authorizations/${authKey}`,
      { customerKey: session?.user.id },
      {
        headers: {
          Authorization:
            "Basic dGVzdF9za19ZWjFhT3dYN0s4bUVlTE0yamRBOHlReHp2TlBHOg==",
        },
      }
    );
    await prisma.subscription.update({
      where: { customerKey },
      data: {
        billingKey: response.data.billingKey,
        card: response.data.card,
      },
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: SubErrorType.ServerError, message: e.toString() });
  }
  const updatedSubscription = await prisma.subscription.update({
    where: { customerKey },
    data: { status: SubscriptionStatus.Active },
  });
  return res.status(200).json(updatedSubscription);
}

export default handleRoute(
  {
    GET: getSubscription,
    POST: createSubscription,
    PATCH: completeSubscription,
  },
  { role: Role.User }
);
