import { Role } from "@prisma/client";
import * as NextAuth from "next-auth/react";
import * as aws from "../../utils/aws";
import { mockRequestResponse } from "../../utils/jest";
import orderRoute from "../../pages/api/order";
import orderSearchRoute from "../../pages/api/order/search";
import ratingRoute from "../../pages/api/rating";
import requestRoute from "../../pages/api/request";
import subIndexRoute from "../../pages/api/sub";
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

  it("GET should return 400", async () => {
    const { req, res } = mockRequestResponse("GET");
    await requestRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("GET should return 404", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { id: "1" };
    jest.spyOn(prisma.request, "findUnique").mockResolvedValueOnce(null);
    await requestRoute(req, res);
    expect(res.statusCode).toBe(404);
  });

  it("POST should return 200", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = { serviceId: "1", videoId: "1", lang: "ko", point: "0" };
    // @ts-ignore
    jest
      .spyOn(prisma.request, "findUnique")
      // @ts-ignore
      .mockResolvedValueOnce({ users: [{ id: "1" }] });
    await requestRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("POST should return 201", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = { serviceId: "1", videoId: "1", lang: "ko", point: "0" };
    jest.spyOn(prisma.request, "findUnique").mockResolvedValueOnce(null);
    await requestRoute(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("POST should return 400", async () => {
    const { req, res } = mockRequestResponse("POST");
    await requestRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("POST should return 409", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = { serviceId: "1", videoId: "1", lang: "ko", point: "0" };
    // @ts-ignore
    jest
      .spyOn(prisma.request, "findUnique")
      // @ts-ignore
      .mockResolvedValueOnce({ users: [{ id: "2" }] });
    await requestRoute(req, res);
    expect(res.statusCode).toBe(409);
  });

  it("DELETE should return 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query.id = "1";
    await requestRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("DELETE should return 400", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    await requestRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("DELETE should return 404", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query.id = "1";
    jest.spyOn(prisma.request, "findUnique").mockResolvedValueOnce(null);
    await requestRoute(req, res);
    expect(res.statusCode).toBe(404);
  });
});

describe("/api/sub", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { id: "1" };
    jest
      .spyOn(prisma.sub, "findUnique")
      // @ts-ignore
      .mockResolvedValueOnce({ file: { key: "" } });
    jest.spyOn(aws, "getS3Url").mockResolvedValue("");
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("POST should return 201", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = { serviceId: "1", videoId: "1", fileId: "1", lang: "ko" };
    jest.spyOn(prisma.sub, "findUnique").mockResolvedValueOnce(null);
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("POST should return 400", async () => {
    const { req, res } = mockRequestResponse("POST");
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("POST should return 409", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = { serviceId: "1", videoId: "1", fileId: "1", lang: "ko" };
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(409);
  });

  it("PATCH should return 200", async () => {
    const { req, res } = mockRequestResponse("PATCH");
    req.body = { serviceId: "1", videoId: "1", fileId: "1", lang: "ko" };
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("DELETE should return 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query.id = "1";
    // @ts-ignore
    jest.spyOn(prisma.sub, "findUnique").mockResolvedValueOnce({ userId: "2" });
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("DELETE should return 400", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("DELETE should return 403", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query.id = "1";
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(403);
  });
});
