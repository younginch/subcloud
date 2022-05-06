import type { CreateStandAloneToastParam } from "@chakra-ui/react";
import { InfoYoutube, PrismaClient, Video } from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";
import NextCors from "nextjs-cors";

export default interface SubError {
  error: SubErrorType;
  message: string;
  code?: string;
  meta?: Record<string, unknown>;
}

export enum SubErrorType {
  NotAnonymousAuthenticated,
  NotUserSpecificAuthenticated,
  MethodNotAllowed,
  NotFound,
  Validation,
  FormValidation,
  DebugOnly,
  InvalidRequest,
  DB,
  Unknown,
}

export type RouteParams<Data> = {
  req: NextApiRequest;
  res: NextApiResponse<Data | SubError>;
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
  return async (req: NextApiRequest, res: NextApiResponse<Data | SubError>) => {
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
        return res.status(401).json({
          error: SubErrorType.NotAnonymousAuthenticated,
          message: "Please sign in",
        });
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
        return res.status(405).json({
          error: SubErrorType.MethodNotAllowed,
          message: `Method "${req.method}" not allowed`,
        });
      }
    } catch (e: any) {
      handleServerError(res, e);
    }
  };
}

function handleServerError(res: NextApiResponse<SubError>, e: any) {
  if (e instanceof PrismaClientValidationError) {
    return res
      .status(400)
      .json({ error: SubErrorType.Validation, message: e.message });
  } else if (e instanceof PrismaClientKnownRequestError) {
    return res.status(500).json({
      error: SubErrorType.DB,
      message: e.message,
      code: e.code,
      meta: e.meta,
    });
  } else if (
    e instanceof PrismaClientUnknownRequestError ||
    e instanceof PrismaClientRustPanicError
  ) {
    return res.status(500).json({ error: SubErrorType.DB, message: e.message });
  } else if (e instanceof PrismaClientInitializationError) {
    return res
      .status(500)
      .json({ error: SubErrorType.DB, message: e.message, code: e.errorCode });
  } else {
    return res
      .status(500)
      .json({ error: SubErrorType.Unknown, message: "Unknown server error" });
  }
}

export function handleClientError(
  res: AxiosResponse,
  toast: CreateStandAloneToastParam
) {}

export type VideoWithInfo = Video & { info: InfoYoutube };
