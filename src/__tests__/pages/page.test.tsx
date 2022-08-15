/* eslint-disable @typescript-eslint/no-unused-vars */
import { render } from "@testing-library/react";
import { Role } from "@prisma/client";
import Home from "../../pages/index";
import Page404 from "../../pages/404";
import Page500 from "../../pages/500";
import {
  renderWithSession,
  renderWithTheme,
  renderWithThemeAndSession,
} from "../jest";
import QnaPage from "../../pages/qna";
import Search from "../../pages/search";
import Dmca from "../../pages/info/dmca";
import Privacy from "../../pages/info/privacy";
import Terms from "../../pages/info/terms";
import SubRankingPage from "../../pages/ranking/sub";
import UserRankingPage from "../../pages/ranking/user";
import VideoRankingPage from "../../pages/ranking/video";
import ReviewDetail from "../../pages/review/[subId]";
import Review from "../../pages/review";
import UserIndex from "../../pages/user/[userId]";
import UserRequest from "../../pages/user/[userId]/request";
import UserSubtitle from "../../pages/user/[userId]/subtitle";
import UserMyHistory from "../../pages/user/my/history";
import UserMyIndex from "../../pages/user/my";
import UserMyOrder from "../../pages/user/my/order";
import UserMyRequest from "../../pages/user/my/request";
import UserMySub from "../../pages/user/my/sub";
import UserMyWithdraw from "../../pages/user/my/withdraw";
import VideoCreate from "../../pages/video/create";
import RequestCreate from "../../pages/video/[serviceId]/[videoId]/request/create";
import SubCreate from "../../pages/video/[serviceId]/[videoId]/sub/create";
import Video from "../../pages/video/[serviceId]/[videoId]";
import Editor from "../../pages/editor";
import NewTab from "../../pages/newtab";
import Uninstall from "../../pages/uninstall";

describe("Pages (pages)", () => {
  it("renders 404", () => {
    renderWithTheme(<Page404 />);
  });

  it("renders 500", () => {
    renderWithTheme(<Page500 />);
  });

  it("renders Index", () => {
    renderWithThemeAndSession(<Home />);
  });

  it("renders Qna", () => {
    render(<QnaPage />);
  });

  it("renders Search", () => {
    render(<Search />);
  });

  it("renders NewTab", () => {
    renderWithThemeAndSession(<NewTab />);
  });

  it("renders Uninstall", () => {
    render(<Uninstall />);
  });
});

describe("Pages (info)", () => {
  it("renders DMCA", () => {
    render(<Dmca />);
  });

  it("renders Privacy", () => {
    render(<Privacy />);
  });

  it("renders Terms", () => {
    render(<Terms />);
  });
});

describe("Pages (ranking)", () => {
  it("renders SubRankingPage", () => {
    render(<SubRankingPage />);
  });

  it("renders UserRankingPage", () => {
    render(<UserRankingPage />);
  });

  it("renders VideoRankingPage", () => {
    render(<VideoRankingPage />);
  });
});

describe("Pages (review)", () => {
  it("renders ReviewDetail", () => {
    // render(<ReviewDetail />);
  });

  it("renders Review", () => {
    render(<Review />);
  });
});

describe("Pages (user)", () => {
  it("renders UserIndex", () => {
    renderWithSession(
      <UserIndex
        // @ts-ignore
        user={{
          id: "",
          name: "",
          email: "",
          emailVerified: null,
          image: "",
          password: "",
          role: Role.User,
          baseLangs: [],
          point: 0,
        }}
        subs={[]}
      />
    );
  });

  it("renders UserRequest", () => {
    renderWithThemeAndSession(<UserRequest />);
  });

  it("renders UserSubtitle", () => {
    renderWithThemeAndSession(<UserSubtitle subs={[]} />);
  });

  it("renders UserMy", () => {
    renderWithThemeAndSession(<UserMyHistory />);
    renderWithThemeAndSession(<UserMyOrder />);
    renderWithThemeAndSession(<UserMyRequest />);
    renderWithThemeAndSession(<UserMySub />);
    renderWithThemeAndSession(<UserMyWithdraw />);
  });
});

// describe("Pages (video)", () => {
//   it("renders RequestCreate", () => {
//     renderWithSession(<RequestCreate />);
//   });

//   it("renders SubCreate", () => {
//     renderWithSession(<SubCreate />);
//   });

//   it("renders Video", () => {
//     // @ts-ignore
//     render(<Video video={undefined} requests={[]} subs={[]} />);
//   });

//   it("renders VideoCreate", () => {
//     render(<VideoCreate />);
//   });
// });

describe("Pages (editor)", () => {
  it("renders Editor", () => {
    renderWithTheme(<Editor />);
  });
});
