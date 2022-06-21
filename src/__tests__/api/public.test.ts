import subByViewRoute from "../../pages/api/ranking/sub/view";
import userByFulfilledRequestsRoute from "../../pages/api/ranking/user/fulfilledRequests";
import userBySubRoute from "../../pages/api/ranking/user/sub";
import userByViewRoute from "../../pages/api/ranking/user/view";
import videoByPoint from "../../pages/api/ranking/video/point";
import videoByRequest from "../../pages/api/ranking/video/request";
import { mockRequestResponse } from "../../utils/jest";

describe("/api/ranking", () => {
  it("Sub By View should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { lang: "", start: "1", end: "2" };
    await subByViewRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("Sub By View should return 400", async () => {
    const { req, res } = mockRequestResponse("GET");
    await subByViewRoute(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("User By Fulfilled Requests should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { lang: "", start: "1", end: "2" };
    await userByFulfilledRequestsRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("User By Sub should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { lang: "", start: "1", end: "2" };
    await userBySubRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("User By View should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { lang: "", start: "1", end: "2" };
    await userByViewRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("Video By Point should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { lang: "", start: "1", end: "2" };
    await videoByPoint(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("Video By Request should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { lang: "", start: "1", end: "2" };
    await videoByRequest(req, res);
    expect(res.statusCode).toBe(200);
  });
});
