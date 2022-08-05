import { NotifyType, ReviewType, SubStatus } from "@prisma/client";
import { render } from "@testing-library/react";
import { RefObject } from "react";
import AdminLayout from "../components/adminLayout";
import ReviewBadge from "../components/badges/reviewBadge";
import ReviewStatusBadge from "../components/badges/reviewStatusBadge";
import EventNotice from "../components/create/eventNotice";
import EditLeftPanel from "../components/editor/editLeftPanel";
import SubtitleComponent from "../components/editor/SubtitleComponent";
import TimeLine from "../components/editor/timeLine";
import Links from "../components/header/links";
import Search from "../components/header/search";
import Layout from "../components/layout";
import NotifyCard from "../components/notify/notifyCard";
import RequestCard, { RequestStatus } from "../components/requestCard";
import Result from "../components/result";
import SelectLanguage from "../components/selectLanguage";
import UploadCard from "../components/uploadCard";
import UserLayout from "../components/user/my/userLayout";
import RequestPanel from "../components/user/requestPanel";
import VideoCard from "../components/videoCard";
import { renderWithThemeAndSession } from "./jest";

describe("Components", () => {
  it("renders a Footer", () => {
    render(<Links />);
  });

  it("renders a Search", () => {
    render(<Search />);
  });

  it("renders a RequestPanel", () => {
    render(<RequestPanel initialRequests={[]} />);
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
    render(<Result>test</Result>);
  });

  it("renders a SelectLanguage", () => {
    render(<SelectLanguage lang="en" error={undefined} setLang={jest.fn()} />);
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

  it("renders editLeftPanel", () => {
    render(<EditLeftPanel />);
  });

  it("renders timeLine", () => {
    render(<TimeLine />);
  });

  it("renders reviewBadge Etc", () => {
    render(<ReviewBadge type={ReviewType.Etc} />);
  });

  it("renders reviewBadge GuidelineViolation", () => {
    render(<ReviewBadge type={ReviewType.GuidelineViolation} />);
  });

  it("renders reviewBadge IncorrectLanguage", () => {
    render(<ReviewBadge type={ReviewType.IncorrectLanguage} />);
  });

  it("renders reviewBadge IncorrectTiming", () => {
    render(<ReviewBadge type={ReviewType.IncorrectTiming} />);
  });

  it("renders reviewBadge IncorrectTitle", () => {
    render(<ReviewBadge type={ReviewType.IncorrectTitle} />);
  });

  it("renders reviewBadge Mistranslation", () => {
    render(<ReviewBadge type={ReviewType.Mistranslation} />);
  });

  it("renders reviewBadge Mistranslation", () => {
    render(<ReviewBadge type={ReviewType.Mistranslation} />);
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

  it("render NotifyCard Announce", async () => {
    render(
      <NotifyCard
        notifyType={NotifyType.Announce}
        title="hello"
        time="world"
        content="content"
        href="google.com"
        onRemove={jest.fn()}
        id="hello"
      />
    );
  });

  it("render NotifyCard Upload", async () => {
    render(
      <NotifyCard
        notifyType={NotifyType.Upload}
        title="hello"
        time="world"
        content="content"
        href="google.com"
        onRemove={jest.fn()}
        id="hello"
      />
    );
  });

  it("render NotifyCard Review", async () => {
    render(
      <NotifyCard
        notifyType={NotifyType.Review}
        title="hello"
        time="world"
        content="content"
        href="google.com"
        onRemove={jest.fn()}
        id="hello"
      />
    );
  });

  it("render NotifyCard StatusChange", async () => {
    render(
      <NotifyCard
        notifyType={NotifyType.StatusChange}
        title="hello"
        time="world"
        content="content"
        href="google.com"
        onRemove={jest.fn()}
        id="hello"
      />
    );
  });

  it("render NotifyCard DEFAULT", async () => {
    render(
      <NotifyCard
        notifyType={"bug" as NotifyType}
        title="hello"
        time="world"
        content="content"
        href="google.com"
        onRemove={jest.fn()}
        id="hello"
      />
    );
  });

  it("render VideoCard", async () => {
    render(<VideoCard />);
  });

  it("render RequestCard Uploaded", async () => {
    render(
      <RequestCard
        title="창모 - 널 지워야 해"
        time="4:30"
        link="https://www.youtube.com/watch?v=i7muqI90138"
        requestLang="한국어"
        requestStatus={RequestStatus.Uploaded}
      />
    );
  });

  it("render RequestCard Wating", async () => {
    render(
      <RequestCard
        title="창모 - 널 지워야 해"
        time="4:30"
        link="https://www.youtube.com/watch?v=i7muqI90138"
        requestLang="한국어"
        requestStatus={RequestStatus.Waiting}
      />
    );
  });

  it("render RequestCard request", async () => {
    render(
      <RequestCard
        title="창모 - 널 지워야 해"
        time="4:30"
        link="https://www.youtube.com/watch?v=i7muqI90138"
        requestLang="한국어"
        requestCount={100}
        buttonType="request"
      />
    );
  });

  it("render RequestCard sub", async () => {
    render(
      <RequestCard
        title="창모 - 널 지워야 해"
        time="4:30"
        link="https://www.youtube.com/watch?v=i7muqI90138"
        requestLang="한국어"
        requestCount={100}
        buttonType="sub"
      />
    );
  });

  it("render UploadCard", async () => {
    render(
      <UploadCard
        title="창모 - 널 지워야 해"
        time="4:30"
        link="https://www.youtube.com/watch?v=i7muqI90138"
        thumbnail="https://i.ytimg.com/vi/9bZkp7q19f0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCcjOO401gtXMFAu0GngeIwZOkO-Q"
        lang="한국어"
        status={SubStatus.Approved}
        viewCount={100}
      />
    );
  });
});
