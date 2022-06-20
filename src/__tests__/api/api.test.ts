import rankingSubByViewRoute from "../../pages/api/ranking/sub/view";
import { mockRequestResponse } from "../../utils/jest";

describe("/api/ranking", () => {
  it("Sub By View should return 400", async () => {
    const { req, res } = mockRequestResponse("GET");
    await rankingSubByViewRoute(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("Sub By View should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { lang: "", start: "1", end: "2" };
    await rankingSubByViewRoute(req, res);
    expect(res.statusCode).toBe(200);
  });
});
