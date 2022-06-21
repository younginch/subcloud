import fileRoute from "../../pages/api/file";
import * as aws from "../../utils/aws";
import * as NextAuth from "next-auth/react";
import { mockRequestResponse } from "../../utils/jest";
import { Role } from "@prisma/client";
import prisma from "../../utils/prisma";

describe("/api/file", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { id: "1" };
    jest.spyOn(aws, "getS3Url").mockResolvedValue("");
    await fileRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("GET should return 404", async () => {
    const { req, res } = mockRequestResponse("GET");
    jest.spyOn(prisma.file, "findUnique").mockResolvedValueOnce(null);
    await fileRoute(req, res);
    expect(res.statusCode).toBe(404);
  });

  it("DELETE should return 200", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query = { id: "1" };
    jest
      .spyOn(prisma.file, "findUnique")
      // @ts-ignore
      .mockResolvedValueOnce({ userId: "2" });
    await fileRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("DELETE should return 403", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query = { id: "1" };
    await fileRoute(req, res);
    expect(res.statusCode).toBe(403);
  });

  it("DELETE should return 404", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query = { id: "1" };
    jest.spyOn(prisma.file, "findUnique").mockResolvedValueOnce(null);
    await fileRoute(req, res);
    expect(res.statusCode).toBe(404);
  });
});
