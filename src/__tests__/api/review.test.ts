import { ReviewType, Role } from "@prisma/client";
import * as NextAuth from "next-auth/react";
import reviewRoute from "../../pages/api/review";
import { mockRequestResponse, testRes } from "../../utils/jest";

describe("/api/review", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "", role: Role.Reviewer, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", testRes(reviewRoute, "GET", 200));

  it(
    "POST should return 201",
    testRes(reviewRoute, "POST", 201, (req) => {
      req.query = { subId: "1" };
      req.body = {
        type: ReviewType.Etc,
        content: "etc",
      };
    })
  );

  it("POST should return 400", testRes(reviewRoute, "POST", 400));

  it("DELETE should return 200", testRes(reviewRoute, "DELETE", 200));
});
