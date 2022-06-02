import { Role } from "@prisma/client";
import axios from "axios";
import { handleRoute, RouteParams } from "../../../utils/types";

async function createOrder({ req, res, prisma }: RouteParams<any>) {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({});
  }
  const order = await prisma.order.create({
    data: { amount },
  });
  return res.status(201).json(order);
}

async function completeOrder({ req, res, prisma }: RouteParams<any>) {
  const { paymentKey, orderId, amount } = req.body;
  if (!paymentKey || !orderId || !amount) {
    return res.status(400).json({});
  }
  axios
    .post(
      "https://api.tosspayments.com/v1/payments/5zJ4xY7m0kODnyRpQWGrN2xqGlNvLrKwv1M9ENjbeoPaZdL6",
      { amount, orderId },
      {
        headers: {
          Authorization:
            "Basic dGVzdF9za19ZWjFhT3dYN0s4bUVlTE0yamRBOHlReHp2TlBHOg==",
        },
      }
    )
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json(error.response.data);
    });
}

export default handleRoute(
  { POST: createOrder, PATCH: completeOrder },
  { role: Role.User }
);
