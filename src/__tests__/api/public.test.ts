import subByViewRoute from "../../pages/api/public/ranking/sub/view";
import userByRatingsRoute from "../../pages/api/public/ranking/user/rating";
import userBySubRoute from "../../pages/api/public/ranking/user/sub";
import userByViewRoute from "../../pages/api/public/ranking/user/view";
import videoByPoint from "../../pages/api/public/ranking/video/point";
import videoByRequest from "../../pages/api/public/ranking/video/request";
import { testRes } from "../jest";

describe("/api/public/ranking", () => {
  it(
    "Sub By View should return 200",
    testRes(subByViewRoute, "GET", 200, (req) => {
      req.query = { lang: "", start: "1", end: "2" };
    })
  );

  it("Sub By View should return 400", testRes(subByViewRoute, "GET", 400));

  it(
    "User By Fulfilled Requests should return 200",
    testRes(userByRatingsRoute, "GET", 200, (req) => {
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
