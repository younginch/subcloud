import { Order, OrderStatus, Role } from "@prisma/client";
import axios from "axios";
import { getPointFromAmount } from "../../../utils/products";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function getOrder({ req, res, prisma }: RouteParams<Order>) {
  const id = req.query.id as string;
  if (!id) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "id" });
  }
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "order" });
  }
  return res.status(200).json(order);
}

async function createOrder({ req, res, prisma }: RouteParams<Order>) {
  const { type, amount } = req.body;
  if (!amount) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "amount" });
  }
  const order = await prisma.order.create({
    data: { type, amount },
  });
  return res.status(201).json(order);
}

async function completeOrder({
  req,
  res,
  prisma,
  session,
}: RouteParams<Order>) {
  const id = req.query.id as string;
  const paymentKey = req.body.paymentKey as string;
  if (!id) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "id" });
  }
  if (!paymentKey) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "paymentKey" });
  }
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "Order" });
  }
  const result = await axios.post(
    `https://api.tosspayments.com/v1/payments/${paymentKey}`,
    { amount: order.amount, orderId: order.id },
    {
      headers: {
        Authorization:
          "Basic dGVzdF9za19ZWjFhT3dYN0s4bUVlTE0yamRBOHlReHp2TlBHOg==",
      },
    }
  );
  if (result.status !== 200) {
    return res.status(500).json(result.data);
  }
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });
  await prisma.user.update({
    where: { id: session?.user.id },
    data: { point: (user?.point ?? 0) + getPointFromAmount(order.amount) },
  });
  const completedOrder = await prisma.order.update({
    where: { id: order.id },
    data: { status: OrderStatus.Completed, paymentKey },
  });
  return res.status(200).json(completedOrder);
}

async function cancelOrder({ req, res, prisma }: RouteParams<Order>) {
  const id = req.query.id as string;
  if (!id) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "id" });
  }
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "order" });
  }
  const result = await axios.post(
    `https://api.tosspayments.com/v1/payments/${order.paymentKey}/cancel`,
    { cancelReason: "고객이 취소를 원함" },
    {
      headers: {
        Authorization:
          "Basic dGVzdF9za19ZWjFhT3dYN0s4bUVlTE0yamRBOHlReHp2TlBHOg==",
      },
    }
  );
  if (result.status === 200) {
    return res.status(200).json(result.data);
  } else {
    return res.status(500).json(result.data);
  }
}

export default handleRoute(
  {
    GET: getOrder,
    POST: createOrder,
    PATCH: completeOrder,
    DELETE: cancelOrder,
  },
  { role: Role.User }
);
