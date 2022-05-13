import axios from "axios";
import { handleRoute, RouteParams } from "../../../utils/types";

async function BuySuccess({ req, res }: RouteParams<any>) {
  axios
    .post("https://api.tosspayments.com/v1/payments/" + req.query.paymentKey, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.TOSSPAY_SECRET_KEY + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        orderId: req.query.orderId,
        amount: req.query.amount,
      },
      responseType: "json",
    })
    .then(function (response) {
      res.redirect(`/buy/success?orderId=${response.data.orderId}`);
    })
    .catch(function (error) {
      res.redirect(
        `/buy/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
      );
    });
}

export default handleRoute({ GET: BuySuccess });
