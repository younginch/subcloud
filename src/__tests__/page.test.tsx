import { render } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import Page404 from "../pages/404";
import Page500 from "../pages/500";
import { renderWithSession, renderWithTheme } from "../utils/jest";
import QnaPage from "../pages/qna";
import Search from "../pages/search";
import Callback from "../pages/auth/callback";
import SignIn from "../pages/auth/signin";
import VerifyRequest from "../pages/auth/verify-request";
import Buy from "../pages/buy";

describe("Pages (pages)", () => {
  it("renders 404", () => {
    renderWithTheme(<Page404 />);
  });

  it("renders 500", () => {
    renderWithTheme(<Page500 />);
  });

  it("renders Index", () => {
    render(<Home />);
  });

  it("renders Qna", () => {
    render(<QnaPage />);
  });

  it("renders Search", () => {
    render(<Search />);
  });
});

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

describe("Pages (buy)", () => {
  it("renders Buy", () => {
    renderWithSession(<Buy />);
  });
});
