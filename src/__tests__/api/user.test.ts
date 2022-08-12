import { Role } from "@prisma/client";
import * as NextAuth from "next-auth/react";
import axios from "axios";
// import * as aws from "../../utils/aws";
import { mockRequestResponse, testRes } from "../jest";
import orderRoute from "../../pages/api/user/order";
import orderSearchRoute from "../../pages/api/user/order/search";
import ratingRoute from "../../pages/api/user/rating";
import requestRoute from "../../pages/api/user/request";
import subIndexRoute from "../../pages/api/user/sub";
import langRoute from "../../pages/api/user/lang";
import prisma from "../../utils/prisma";

describe("/api/user/order", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it(
    "GET should return 200",
    testRes(orderRoute, "GET", 200, (req) => {
      req.query = { id: "1" };
    })
  );

  it("GET should return 400", testRes(orderRoute, "GET", 400));

  it(
    "GET should return 404",
    testRes(orderRoute, "GET", 404, (req) => {
      req.query = { id: "1" };
      jest.spyOn(prisma.order, "findUnique").mockResolvedValueOnce(null);
    })
  );

  it(
    "POST should return 201",
    testRes(orderRoute, "POST", 201, (req) => {
      req.body = { amount: "1" };
    })
  );

  it("POST should return 400", testRes(orderRoute, "POST", 400));

  it(
    "PATCH should return 200",
    testRes(orderRoute, "PATCH", 200, (req) => {
      req.query.id = "1";
      req.body = { paymentKey: "1" };
      jest.spyOn(axios, "post").mockResolvedValueOnce({});
    })
  );

  it(
    "DELETE should return 200",
    testRes(orderRoute, "DELETE", 200, (req) => {
      req.query.id = "1";
      jest
        .spyOn(prisma.order, "findUnique")
        // @ts-ignore
        .mockResolvedValueOnce({ userId: "2" });
      jest.spyOn(axios, "post").mockResolvedValueOnce({ status: 200 });
      // @ts-ignore
      jest.spyOn(prisma.order, "update").mockResolvedValueOnce({});
    })
  );
});

describe("/api/user/order/search", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it(
    "GET should return 200",
    testRes(orderSearchRoute, "GET", 200, (req) => {
      req.query = { userId: "1" };
    })
  );
});

describe("/api/rating", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it(
    "GET should return 200",
    testRes(ratingRoute, "GET", 200, (req) => {
      req.query = { userId: "1" };
    })
  );

  it(
    "POST should return 201",
    testRes(ratingRoute, "POST", 201, (req) => {
      jest
        .spyOn(prisma.sub, "findUnique")
        // @ts-ignore
        .mockResolvedValueOnce({ userId: "1" });
      req.body = { subId: "1", score: "1" };
      jest.spyOn(prisma.rating, "findUnique").mockResolvedValueOnce(null);
    })
  );

  it(
    "POST should return 400",
    testRes(ratingRoute, "POST", 400, (req) => {
      jest
        .spyOn(prisma.sub, "findUnique")
        // @ts-ignore
        .mockResolvedValueOnce({ userId: "2" });
      req.body = { subId: "1", score: "1" };
    })
  );

  it(
    "POST should return 409",
    testRes(ratingRoute, "POST", 409, (req) => {
      req.body = { subId: "1", score: "1" };
    })
  );

  it(
    "PATCH should return 200",
    testRes(ratingRoute, "PATCH", 200, (req) => {
      req.body = { id: "1", score: "1" };
    })
  );

  it(
    "PATCH should return 400",
    testRes(ratingRoute, "PATCH", 400, (req) => {
      req.body = { id: "1", score: "1" };
      jest.spyOn(prisma.rating, "findUnique").mockResolvedValueOnce(null);
    })
  );

  it(
    "DELETE should return 200",
    testRes(ratingRoute, "DELETE", 200, (req) => {
      req.query.id = "1";
    })
  );
});

describe("/api/user/request", () => {
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
    req.body = {
      serviceId: "1",
      videoId: "1",
      lang: "ko",
      requestPoint: "0",
      fundPoint: "0",
    };
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
    req.body = {
      serviceId: "1",
      videoId: "1",
      lang: "ko",
      requestPoint: "0",
      fundPoint: "0",
    };
    jest.spyOn(prisma.request, "findUnique").mockResolvedValueOnce(null);
    await requestRoute(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("POST should return 400", async () => {
    const { req, res } = mockRequestResponse("POST");
    await requestRoute(req, res);
    expect(res.statusCode).toBe(400);
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

describe("/api/user/sub", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  // it("GET should return 200", async () => {
  //   const { req, res } = mockRequestResponse("GET");
  //   req.query = { id: "1" };
  //   jest
  //     .spyOn(prisma.sub, "findUnique")
  //     // @ts-ignore
  //     .mockResolvedValueOnce({ file: { key: "" } });
  //   jest.spyOn(aws, "getS3Url").mockResolvedValue("");
  //   await subIndexRoute(req, res);
  //   expect(res.statusCode).toBe(200);
  // });

  // it("POST should return 201", async () => {
  //   const { req, res } = mockRequestResponse("POST");
  //   req.body = { serviceId: "1", videoId: "1", fileId: "1", lang: "ko" };
  //   jest.spyOn(prisma.sub, "findUnique").mockResolvedValueOnce(null);
  //   await subIndexRoute(req, res);
  //   expect(res.statusCode).toBe(201);
  // });

  it("POST should return 400", async () => {
    const { req, res } = mockRequestResponse("POST");
    await subIndexRoute(req, res);
    expect(res.statusCode).toBe(400);
  });

  // it("POST should return 409", async () => {
  //   const { req, res } = mockRequestResponse("POST");
  //   req.body = { serviceId: "1", videoId: "1", fileId: "1", lang: "ko" };
  //   await subIndexRoute(req, res);
  //   expect(res.statusCode).toBe(409);
  // });

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

describe("/api/user/lang", () => {
  beforeAll(() => {
    jest.spyOn(NextAuth, "getSession").mockResolvedValue({
      user: { id: "2", role: Role.User, point: 0 },
      expires: "",
    });
  });

  it("GET should return 200", async () => {
    const { req, res } = mockRequestResponse("GET");
    await langRoute(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("PATCH should return 200", async () => {
    const { req, res } = mockRequestResponse("PATCH");
    req.body = {
      baseLang: "en",
      requestLang: "ko",
    };
    await langRoute(req, res);
    expect(res.statusCode).toBe(200);
  });
});
