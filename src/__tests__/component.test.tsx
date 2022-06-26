import { SubStatus } from "@prisma/client";
import { render } from "@testing-library/react";
import AdminLayout from "../components/adminLayout";
import ReviewStatusBadge from "../components/badges/reviewStatusBadge";
import EventNotice from "../components/create/eventNotice";
import Links from "../components/header/links";
import Search from "../components/header/search";
import Layout from "../components/layout";
import SelectLanguage from "../components/selectLanguage";
import RequestPanel from "../components/user/requestPanel";
import { renderWithSession, renderWithThemeAndSession } from "../utils/jest";

describe("Components", () => {
  it("renders a Footer", () => {
    render(<Links />);
  });

  it("renders a Search", () => {
    render(<Search />);
  });

  it("renders a RequestPanel", () => {
    render(<RequestPanel requests={[]} />);
  });

  it("renders a adminLayout", () => {
    render(<AdminLayout>a</AdminLayout>);
  });

  it("renders a Layout", () => {
    renderWithThemeAndSession(
      <Layout
        options={{
          auth: false,
        }}
      >
        a
      </Layout>
    );
  });

  it("renders a SelectLanguage", () => {
    render(
      <SelectLanguage
        register={{
          onChange: jest.fn(),
          onBlur: jest.fn(),
          ref: jest.fn(),
          name: "",
        }}
      />
    );
  });

  it("renders ReviewStatusBadge", () => {
    render(<ReviewStatusBadge />);
    render(<ReviewStatusBadge status={SubStatus.Approved} />);
    render(<ReviewStatusBadge status={SubStatus.InReview} />);
    render(<ReviewStatusBadge status={SubStatus.Pending} />);
    render(<ReviewStatusBadge status={SubStatus.Private} />);
    render(<ReviewStatusBadge status={SubStatus.Rejected} />);
    render(<ReviewStatusBadge status={SubStatus.Reported} />);
  });

  it("renders EventNotice", () => {
    renderWithThemeAndSession(<EventNotice />);
  });
});
