import { render } from "@testing-library/react";
import Callback from "../../pages/auth/callback";
import Error from "../../pages/auth/error";
import SignIn from "../../pages/auth/signin";
import SignOut from "../../pages/auth/signout";
import VerifyRequest from "../../pages/auth/verify-request";

describe("Pages (auth)", () => {
  it("renders Callback", () => {
    render(<Callback />);
  });

  it("renders Error", () => {
    render(<Error />);
  });

  it("renders Signout", () => {
    render(<SignOut />);
  });

  it("renders Signin", () => {
    render(<SignIn />);
  });

  it("renders VerifyRequest", () => {
    render(<VerifyRequest />);
  });
});
