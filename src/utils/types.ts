import type { CreateStandAloneToastParam } from "@chakra-ui/react";
import { InfoYoutube, PrismaClient, Video } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";
import NextCors from "nextjs-cors";

export default interface ResError {
  error: string;
  log?: string;
}

enum ResErrorType {
  NotFound,
}

export type RouteParams<Data> = {
  req: NextApiRequest;
  res: NextApiResponse<Data | ResError>;
  prisma: PrismaClient;
  session?: Session;
};

type RouteFunction<Data> = (params: RouteParams<Data>) => any;

type HandleRouteProps<Data> = {
  GET?: RouteFunction<Data>;
  POST?: RouteFunction<Data>;
  PATCH?: RouteFunction<Data>;
  DELETE?: RouteFunction<Data>;
};

type HandleRouteOption = {
  useSession?: boolean;
};

export function handleRoute<Data>(
  method: HandleRouteProps<Data>,
  options: HandleRouteOption = { useSession: false }
): any {
  const { GET, POST, PATCH, DELETE } = method;
  const { useSession } = options;
  return async (req: NextApiRequest, res: NextApiResponse<Data | ResError>) => {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "chrome-extension://jomohjeldemfddibgokobknlgmdmfnfb",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const prisma = new PrismaClient();
    let params: RouteParams<Data> = { req, res, prisma };
    if (useSession) {
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      params = { ...params, session };
    }
    try {
      if (GET && req.method === "GET") {
        return GET(params);
      } else if (POST && req.method === "POST") {
        return POST(params);
      } else if (PATCH && req.method === "PATCH") {
        return PATCH(params);
      } else if (DELETE && req.method === "DELETE") {
        return DELETE(params);
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
    } catch (e: any) {
      handleServerError(res, e);
    }
  };
}

function handleServerError(res: NextApiResponse, e: any) {
  if (e instanceof PrismaClientValidationError) {
    return res.status(400).json({ error: "Validation Error" });
  } else if (e instanceof PrismaClientKnownRequestError) {
    return res.status(500).json({ error: "Internal Server Error" });
  } else if (e instanceof PrismaClientUnknownRequestError) {
    return res.status(500).json({ error: "Internal Server Error" });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export function handleClientError(
  res: AxiosResponse,
  toast: CreateStandAloneToastParam
) {}

export type VideoWithInfo = Video & { info: InfoYoutube };
