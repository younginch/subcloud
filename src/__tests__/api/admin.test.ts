import { mockRequestResponse } from "../../utils/jest";
import adminDeleteRoute from "../../pages/api/admin/delete";
import adminExampleRoute from "../../pages/api/admin/example";
import adminSettleRoute from "../../pages/api/admin/settle";
import adminUserRoute from "../../pages/api/admin/user";
import adminWithdraw from "../../pages/api/admin/withdraw";
import * as NextAuth from "next-auth/react";
import { Role } from "@prisma/client";

describe("/api/admin", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "", role: Role.Admin, point: 0 },
      expires: "",
    });
  });

  it("/remove GET 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    jest.mock("../../utils/prisma");
    await adminDeleteRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("/example GET 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    await adminExampleRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("/example POST 201", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body.url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    // @ts-ignore
    jest.spyOn(prisma.exampleVideo, "create").mockResolvedValue({});
    await adminExampleRoute(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("/example DELETE 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query = { id: "1" };
    // @ts-ignore
    jest.spyOn(prisma.exampleVideo, "delete").mockResolvedValue({});
    await adminExampleRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("/example DELETE 400", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    await adminExampleRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("/settle GET 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    await adminSettleRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("/settle POST 201", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      startAt: new Date(),
      endAt: new Date(),
      totalPoint: 1,
    };
    await adminSettleRoute(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("/settle DELETE 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query = { id: "1" };
    // @ts-ignore
    jest.spyOn(prisma.settle, "delete").mockResolvedValue({ settlePoints: [] });
    await adminSettleRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("/user GET 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    await adminUserRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("/user PATCH 200", async () => {
    const { req, res } = mockRequestResponse("PATCH");
    req.query = { id: "1" };
    req.body = {
      role: Role.Admin,
      point: 1,
    };
    // @ts-ignore
    jest.spyOn(prisma.user, "update").mockResolvedValue({});
    await adminUserRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("/user PATCH 400", async () => {
    const { req, res } = mockRequestResponse("PATCH");
    await adminUserRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("/user DELETE 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query = { id: "1" };
    // @ts-ignore
    jest.spyOn(prisma.user, "delete").mockResolvedValue({});
    await adminUserRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("/user DELETE 400", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    await adminUserRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("/withdraw GET 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    await adminWithdraw(req, res);
    expect(res.statusCode).toBe(200);
  });
});
