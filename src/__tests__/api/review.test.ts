import { ReviewType, Role } from "@prisma/client";
import * as NextAuth from "next-auth/react";
import reviewRoute from "../../pages/api/review";
import { mockRequestResponse } from "../../utils/jest";

describe("/api/review", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "", role: Role.Reviewer, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    await reviewRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("POST should return 201", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.query = { subId: "1" };
    req.body = {
      type: ReviewType.Etc,
      content: "etc",
    };
    await reviewRoute(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("POST should return 400", async () => {
    const { req, res } = mockRequestResponse("POST");
    await reviewRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("DELETE should return 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query = { id: "1" };
    await reviewRoute(req, res);
    expect(res.statusCode).toBe(200);
  });
});
