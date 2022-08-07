import { ReviewType, Role } from "@prisma/client";
import * as NextAuth from "next-auth/react";
import reviewRoute from "../../pages/api/review";
import { testRes } from "../jest";
import prisma from "../../utils/prisma";

describe("/api/review", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "", role: Role.Reviewer, point: 0 },
      expires: "",
    });
  });

  it(
    "GET should return 200",
    testRes(reviewRoute, "GET", 200, (req) => {
      req.query = { subId: "1" };
      jest.spyOn(prisma.review, "findMany").mockResolvedValueOnce([
        {
          id: "",
          subId: "",
          status: "Approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    })
  );

  it(
    "GET should return 200",
    testRes(reviewRoute, "GET", 200, (req) => {
      req.query = { subId: "1" };
      jest.spyOn(prisma.review, "findMany").mockResolvedValueOnce([]);
    })
  );

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
