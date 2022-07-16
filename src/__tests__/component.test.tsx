import { SubStatus } from "@prisma/client";
import { render } from "@testing-library/react";
import { RefObject } from "react";
import AdminLayout from "../components/adminLayout";
import ReviewStatusBadge from "../components/badges/reviewStatusBadge";
import EventNotice from "../components/create/eventNotice";
import SubtitleComponent from "../components/editor/SubtitleComponent";
import TimeLine from "../components/editor/timeLine";
import Links from "../components/header/links";
import Search from "../components/header/search";
import Layout from "../components/layout";
import Result from "../components/result";
import SelectLanguage from "../components/selectLanguage";
import UserLayout from "../components/user/my/userLayout";
import RequestPanel from "../components/user/requestPanel";
import { renderWithThemeAndSession } from "../utils/jest";

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

  it("renders a Result", () => {
    render(
      <Result>
        <></>
      </Result>
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

  it("renders userLayout", () => {
    render(<UserLayout>a</UserLayout>);
  });

  it("renders timeLine", () => {
    render(<TimeLine />);
  });

  it("renders SubtitleComponent", () => {
    render(
      <SubtitleComponent
        boxRef={
          {
            current: { offsetWidth: 0, offsetHeight: 0 },
          } as unknown as RefObject<HTMLDivElement>
        }
      />
    );
  });
});
