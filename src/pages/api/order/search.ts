import { Order, Role } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function getOrders({ req, res, prisma }: RouteParams<Order[]>) {
  const userId = req.query.userId as string;
  if (!userId) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "userId" });
  }
  const orders = await prisma.order.findMany({ where: { userId } });
  return res.status(200).json(orders);
}

export default handleRoute({ GET: getOrders }, { role: Role.User });
