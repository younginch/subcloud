import { render } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import Page404 from "../pages/404";
import Page500 from "../pages/500";
import {
  renderWithSession,
  renderWithTheme,
  renderWithThemeAndSession,
} from "../utils/jest";
import QnaPage from "../pages/qna";
import Search from "../pages/search";
import Callback from "../pages/auth/callback";
import SignIn from "../pages/auth/signin";
import VerifyRequest from "../pages/auth/verify-request";
import Buy from "../pages/buy";
import OrderFail from "../pages/buy/order/fail";
import OrderProcess from "../pages/buy/order/process";
import OrderSuccess from "../pages/buy/order/success";
import SubscriptionFail from "../pages/buy/subscription/fail";
import SubscriptionProcess from "../pages/buy/subscription/process";
import SubscriptionSuccess from "../pages/buy/subscription/success";
import Dmca from "../pages/info/dmca";
import Privacy from "../pages/info/privacy";
import Terms from "../pages/info/terms";
import SubRankingPage from "../pages/ranking/sub";
import UserRankingPage from "../pages/ranking/user";
import VideoRankingPage from "../pages/ranking/video";
import ReviewDetail from "../pages/review/[subId]";
import Review from "../pages/review";
import UserIndex from "../pages/user/[userId]";
import { Role } from "@prisma/client";
import UserRequest from "../pages/user/[userId]/request";
import UserSubtitle from "../pages/user/[userId]/subtitle";
import UserMyHistory from "../pages/user/my/history";
import UserMyIndex from "../pages/user/my";
import UserMyOrder from "../pages/user/my/order";
import UserMyRequest from "../pages/user/my/request";
import UserMySub from "../pages/user/my/sub";
import UserMyWithdraw from "../pages/user/my/withdraw";
import VideoCreate from "../pages/video/create";
import RequestCreate from "../pages/video/[serviceId]/[videoId]/request/create";
import SubCreate from "../pages/video/[serviceId]/[videoId]/sub/create";
import Video from "../pages/video/[serviceId]/[videoId]";
import AdminExample from "../pages/admin/example";
import Admin from "../pages/admin";
import AdminSettle from "../pages/admin/settle";
import AdminUser from "../pages/admin/user";
import AdminWithdraw from "../pages/admin/withdraw";

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

describe("Pages (admin)", () => {
  it("renders AdminExample", () => {
    render(<AdminExample />);
  });

  it("renders Admin", () => {
    render(<Admin />);
  });

  it("renders AdminSettle", () => {
    render(<AdminSettle />);
  });

  // it("renders AdminUser", () => {
  //   render(<AdminUser />)
  // })

  // it("renders AdminWithdraw", () => {
  //   render(<AdminWithdraw />)
  // })
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
  // it("renders ReviewDetail", () => {
  //   render(<ReviewDetail />);
  // });

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
    renderWithSession(<UserMyHistory />);
    renderWithSession(<UserMyIndex />);
    renderWithSession(<UserMyOrder />);
    renderWithSession(<UserMyRequest requests={[]} />);
    renderWithSession(<UserMySub subs={[]} />);
    renderWithSession(<UserMyWithdraw />);
  });
});

describe("Pages (video)", () => {
  // it("renders RequestCreate", () => {
  //   render(<RequestCreate />);
  // });

  // it("renders SubCreate", () => {
  //   render(<SubCreate />);
  // });

  it("renders Video", () => {
    // @ts-ignore
    render(<Video video={undefined} requests={[]} subs={[]} />);
  });

  // it("renders VideoCreate", () => {
  //   render(<VideoCreate />);
  // });
});
