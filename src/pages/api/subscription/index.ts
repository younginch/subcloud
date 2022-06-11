import {
  Role,
  Subscription,
  SubscriptionStatus,
  SubscriptionType,
} from "@prisma/client";
import axios from "axios";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function createSubscription({
  req,
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
  } catch (e) {
    console.log(e);
  }
  const updatedSubscription = await prisma.subscription.update({
    where: { customerKey },
    data: { status: SubscriptionStatus.Active },
  });
  return res.status(200).json(updatedSubscription);
}

export default handleRoute(
  { POST: createSubscription, PATCH: completeSubscription },
  { role: Role.User }
);
