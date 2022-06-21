import { Role } from "@prisma/client";
import * as NextAuth from "next-auth/react";
import { mockRequestResponse } from "../../utils/jest";
import orderRoute from "../../pages/api/order";
import orderSearchRoute from "../../pages/api/order/search";
import ratingRoute from "../../pages/api/rating";
import requestRoute from "../../pages/api/request";
import prisma from "../../utils/prisma";
import axios from "axios";

describe("/api/order", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { id: "1" };
    await orderRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("GET should return 400", async () => {
    const { req, res } = mockRequestResponse("GET");
    await orderRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("GET should return 404", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { id: "1" };
    jest.spyOn(prisma.order, "findUnique").mockResolvedValueOnce(null);
    await orderRoute(req, res);
    expect(res.statusCode).toBe(404);
  });

  it("POST should return 201", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = { amount: "1" };
    await orderRoute(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("POST should return 400", async () => {
    const { req, res } = mockRequestResponse("POST");
    await orderRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("PATCH should return 200", async () => {
    const { req, res } = mockRequestResponse("PATCH");
    req.query.id = "1";
    req.body = { paymentKey: "1" };
    jest.spyOn(axios, "post").mockResolvedValueOnce({});
    await orderRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("DELETE should return 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query.id = "1";
    jest
      .spyOn(prisma.order, "findUnique")
      // @ts-ignore
      .mockResolvedValueOnce({ userId: "2" });
    jest.spyOn(axios, "post").mockResolvedValueOnce({ status: 200 });
    // @ts-ignore
    jest.spyOn(prisma.order, "update").mockResolvedValueOnce({});
    await orderRoute(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("/api/order/search", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { userId: "1" };
    await orderSearchRoute(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("/api/rating", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { userId: "1" };
    await ratingRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("POST should return 201", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = { subId: "1", score: "1" };
    jest.spyOn(prisma.rating, "findUnique").mockResolvedValueOnce(null);
    await ratingRoute(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("POST should return 409", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = { subId: "1", score: "1" };
    await ratingRoute(req, res);
    expect(res.statusCode).toBe(409);
  });

  it("PATCH should return 200", async () => {
    const { req, res } = mockRequestResponse("PATCH");
    req.body = { id: "1", score: "1" };
    jest.spyOn(prisma.rating, "findUnique").mockResolvedValueOnce(null);
    await ratingRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("PATCH should return 409", async () => {
    const { req, res } = mockRequestResponse("PATCH");
    req.body = { id: "1", score: "1" };
    await ratingRoute(req, res);
    expect(res.statusCode).toBe(409);
  });

  it("DELETE should return 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query.id = "1";
    await ratingRoute(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("/api/request", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { id: "1" };
    await requestRoute(req, res);
    expect(res.statusCode).toBe(200);
  });
});
