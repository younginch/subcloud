import { testRes, testAllMethod } from "../../utils/jest";
import adminDeleteRoute from "../../pages/api/admin/delete";
import adminExampleRoute from "../../pages/api/admin/example";
import adminSettleRoute from "../../pages/api/admin/settle";
import adminUserRoute from "../../pages/api/admin/user";
import adminWithdraw from "../../pages/api/admin/withdraw";
import * as NextAuth from "next-auth/react";
import { Role } from "@prisma/client";
import prisma from "../../utils/prisma";

describe("", () => {
  it(
    "should return 403 if user is ",
    testAllMethod(
      [
        [adminDeleteRoute, ["GET"]],
        [adminExampleRoute, ["GET"]],
        [adminSettleRoute, ["GET"]],
        [adminUserRoute, ["GET"]],
        [adminWithdraw, ["GET"]],
      ],
      403,
      Role.Reviewer
    )
  );
});

describe("/api/admin", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "", role: Role.Admin, point: 0 },
      expires: "",
    });
  });

  it("/example GET 200", testRes(adminDeleteRoute, "GET", 200));

  it(
    "/example POST 201",
    testRes(adminExampleRoute, "POST", 201, (req) => {
      req.body.url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    })
  );

  it(
    "/example DELETE 200",
    testRes(adminExampleRoute, "DELETE", 200, (req) => {
      req.query = { id: "1" };
    })
  );

  it("/example DELETE 400", testRes(adminExampleRoute, "DELETE", 400));

  it("/settle GET 200", testRes(adminSettleRoute, "GET", 200));

  it(
    "/settle POST 201",
    testRes(adminSettleRoute, "POST", 201, (req) => {
      req.body = {
        startAt: new Date(),
        endAt: new Date(),
        totalPoint: 1,
      };
    })
  );

  it(
    "/settle DELETE 200",
    testRes(adminSettleRoute, "DELETE", 200, (req) => {
      req.query = { id: "1" };
      jest
        .spyOn(prisma.settle, "delete")
        // @ts-ignore
        .mockResolvedValue({ settlePoints: [] });
    })
  );

  it("/user GET 200", testRes(adminUserRoute, "GET", 200));

  it(
    "/user PATCH 200",
    testRes(adminUserRoute, "PATCH", 200, (req) => {
      req.query = { id: "1" };
      req.body = {
        role: Role.Admin,
        point: 1,
      };
    })
  );

  it("/user PATCH 400", testRes(adminUserRoute, "PATCH", 400));

  it(
    "/user DELETE 200",
    testRes(adminUserRoute, "DELETE", 200, (req) => {
      req.query = { id: "1" };
    })
  );

  it("/user DELETE 400", testRes(adminUserRoute, "DELETE", 400));

  it("/withdraw GET 200", testRes(adminWithdraw, "GET", 200));
});
function mockRequestResponse(method: string): { req: any; res: any } {
  throw new Error("Function not implemented.");
}
