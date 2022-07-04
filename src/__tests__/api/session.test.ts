import fileRoute from "../../pages/api/user/file";
import * as aws from "../../utils/aws";
import * as NextAuth from "next-auth/react";
import { testRes } from "../../utils/jest";
import { Role } from "@prisma/client";
import prisma from "../../utils/prisma";

describe("/api/user/file", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it(
    "GET should return 200",
    testRes(fileRoute, "GET", 200, (req) => {
      req.query = { id: "1" };
      jest.spyOn(aws, "getS3Url").mockResolvedValue("");
    })
  );

  it(
    "GET should return 404",
    testRes(fileRoute, "GET", 404, (req) => {
      jest.spyOn(prisma.file, "findUnique").mockResolvedValueOnce(null);
    })
  );

  it(
    "DELETE should return 200",
    testRes(fileRoute, "DELETE", 200, (req) => {
      req.query = { id: "1" };
      jest
        .spyOn(prisma.file, "findUnique")
        // @ts-ignore
        .mockResolvedValueOnce({ userId: "2" });
    })
  );

  it(
    "DELETE should return 403",
    testRes(fileRoute, "DELETE", 403, (req) => {
      req.query = { id: "1" };
    })
  );

  it(
    "DELETE should return 404",
    testRes(fileRoute, "DELETE", 404, (req) => {
      req.query = { id: "1" };
      jest.spyOn(prisma.file, "findUnique").mockResolvedValueOnce(null);
    })
  );
});
