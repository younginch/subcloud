import subByViewRoute from "../../pages/api/ranking/sub/view";
import userByFulfilledRequestsRoute from "../../pages/api/ranking/user/fulfilledRequests";
import userBySubRoute from "../../pages/api/ranking/user/sub";
import userByViewRoute from "../../pages/api/ranking/user/view";
import videoByPoint from "../../pages/api/ranking/video/point";
import videoByRequest from "../../pages/api/ranking/video/request";
import { testRes } from "../../utils/jest";

describe("/api/ranking", () => {
  it(
    "Sub By View should return 200",
    testRes(subByViewRoute, "GET", 200, (req) => {
      req.query = { lang: "", start: "1", end: "2" };
    })
  );

  it("Sub By View should return 400", testRes(subByViewRoute, "GET", 400));

  it(
    "User By Fulfilled Requests should return 200",
    testRes(userByFulfilledRequestsRoute, "GET", 200, (req) => {
      req.query = { lang: "", start: "1", end: "2" };
    })
  );

  it(
    "User By Sub should return 200",
    testRes(userBySubRoute, "GET", 200, (req) => {
      req.query = { lang: "", start: "1", end: "2" };
    })
  );

  it(
    "User By View should return 200",
    testRes(userByViewRoute, "GET", 200, (req) => {
      req.query = { lang: "", start: "1", end: "2" };
    })
  );

  it(
    "Video By Point should return 200",
    testRes(videoByPoint, "GET", 200, (req) => {
      req.query = { lang: "", start: "1", end: "2" };
    })
  );

  it(
    "Video By Request should return 200",
    testRes(videoByRequest, "GET", 200, (req) => {
      req.query = { lang: "", start: "1", end: "2" };
    })
  );
});
