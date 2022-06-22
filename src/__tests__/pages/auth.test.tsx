import { render } from "@testing-library/react";
import Callback from "../../pages/auth/callback";
import SignIn from "../../pages/auth/signin";
import VerifyRequest from "../../pages/auth/verify-request";

describe("Pages (auth)", () => {
  it("renders Callback", () => {
    render(<Callback />);
  });

  it("renders Signin", () => {
    render(<SignIn providers={[]} csrfToken={""} />);
  });

  it("renders VerifyRequest", () => {
    render(<VerifyRequest />);
  });
});
