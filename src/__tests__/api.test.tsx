import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks, RequestMethod } from "node-mocks-http";
import rankingSubByViewRoute from "../pages/api/ranking/sub/view";
import adminDeleteRoute from "../pages/api/admin/delete";
import * as NextAuth from "next-auth/react";
import prisma from "../utils/prisma";

describe("API Endpoint /api/ranking", () => {
  function mockRequestResponse(method: RequestMethod = "GET") {
    const { req, res } = createMocks({ method });
    return {
      req: req as unknown as NextApiRequest,
      res: res as unknown as NextApiResponse,
    };
  }

  it("should return a successful response from Notehub", async () => {
    const { req, res } = mockRequestResponse();
    await rankingSubByViewRoute(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("should return a successful response from Notehub", async () => {
    const { req, res } = mockRequestResponse();
    req.query = { lang: "", start: "1", end: "2" };

    jest.spyOn(prisma.sub, "findMany").mockResolvedValue([]);

    await rankingSubByViewRoute(req, res);

    expect(res.statusCode).toBe(200);
  });
});

describe("API Endpoint /api/admin", () => {
  function mockRequestResponse(method: RequestMethod = "GET") {
    const { req, res } = createMocks({ method });
    return {
      req: req as unknown as NextApiRequest,
      res: res as unknown as NextApiResponse,
    };
  }

  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue(null);
  });

  it("/remove", async () => {
    const { req, res } = mockRequestResponse();
    await adminDeleteRoute(req, res);

    expect(res.statusCode).toBe(401);
  });
});
