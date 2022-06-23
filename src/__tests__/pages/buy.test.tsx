import { render } from "@testing-library/react";
import Buy from "../../pages/buy";
import OrderFail from "../../pages/buy/order/fail";
import OrderProcess from "../../pages/buy/order/process";
import OrderSuccess from "../../pages/buy/order/success";
import SubscriptionFail from "../../pages/buy/subscription/fail";
import SubscriptionProcess from "../../pages/buy/subscription/process";
import SubscriptionSuccess from "../../pages/buy/subscription/success";
import { renderWithSession } from "../../utils/jest";

describe("Pages (buy)", () => {
  it("renders Order Fail", () => {
    render(<OrderFail />);
  });

  it("renders Order Process", () => {
    render(<OrderProcess orderId="" paymentKey="" amount="" />);
  });

  it("renders Order Success", () => {
    render(<OrderSuccess />);
  });

  it("renders Subscription Fail", () => {
    render(<SubscriptionFail />);
  });

  it("renders Subscription Process", () => {
    render(<SubscriptionProcess customerKey="" authKey="" />);
  });

  it("renders Subscription Success", () => {
    render(<SubscriptionSuccess />);
  });

  it("renders Buy", () => {
    renderWithSession(<Buy />);
  });
});
