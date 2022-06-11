import type { CreateStandAloneToastParam } from "@chakra-ui/react";
import {
  YoutubeVideo,
  Request,
  Video,
  YoutubeChannel,
  Sub,
  File,
  Order,
  User,
  PrismaClient,
  Role,
} from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";
import NextCors from "nextjs-cors";
import prisma from "./prisma";

export type PageOptions = {
  auth: Role | boolean;
  width?: string | number;
  bgColorLight?: string;
  bgColorDark?: string;
  hideHeader?: boolean;
  hideTitle?: boolean;
  hideNavBar?: boolean;
};

export default interface ResError {
  error: SubErrorType;
  message: string;
  code?: string;
  meta?: Record<string, unknown>;
}

export async function setCORS(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: [
      `chrome-extension://${process.env.CHROME_EXTENSION_ID}`,
      "https://www.youtube.com",
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
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
  ServerError,
}

export type RouteParams<ResponseType> = {
  req: NextApiRequest;
  res: NextApiResponse<ResponseType | ResError>;
  prisma: PrismaClient;
  session?: Session;
};

type RouteFunction<ResponseType> = (params: RouteParams<ResponseType>) => void;

type HandleRouteProps<GetRes, PostRes, PatchRes, DeleteRes> = {
  GET?: RouteFunction<GetRes>;
  POST?: RouteFunction<PostRes>;
  PATCH?: RouteFunction<PatchRes>;
  DELETE?: RouteFunction<DeleteRes>;
};

type HandleRouteOption = {
  role?: Role;
  debugOnly?: boolean;
};

export function handleRoute<GetRes, PostRes, PatchRes, DeleteRes>(
  method: HandleRouteProps<GetRes, PostRes, PatchRes, DeleteRes>,
  options: HandleRouteOption = { role: undefined, debugOnly: false }
): (
  req: NextApiRequest,
  res: NextApiResponse<GetRes | PostRes | PatchRes | DeleteRes | ResError>
) => Promise<void> {
  const { GET, POST, PATCH, DELETE } = method;
  const { role, debugOnly } = options;
  return async (
    req: NextApiRequest,
    res: NextApiResponse<GetRes | PostRes | PatchRes | DeleteRes | ResError>
  ) => {
    setCORS(req, res);
    let params: RouteParams<GetRes | PostRes | PatchRes | DeleteRes> = {
      req,
      res,
      prisma,
    };
    if (debugOnly) {
      if (process.env.NODE_ENV === "production") {
        return res.status(401).json({
          error: SubErrorType.DebugOnly,
          message: "Unauthorized in production",
        });
      }
    }
    if (role) {
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({
          error: SubErrorType.NotAnonymousAuthenticated,
          message: "Please sign in",
        });
      }
      if (role === Role.Admin) {
        if (session.user.role !== Role.Admin) {
          return res.status(403).json({
            error: SubErrorType.NotUserSpecificAuthenticated,
            message: "You are not an admin",
          });
        }
      } else if (role === Role.Reviewer) {
        if (
          session.user.role !== Role.Reviewer &&
          session.user.role !== Role.Admin
        ) {
          return res.status(403).json({
            error: SubErrorType.NotUserSpecificAuthenticated,
            message: "You are not a reviewer",
          });
        }
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
      console.log(e);
      handleServerError(res, e);
    }
  };
}

function handleServerError(res: NextApiResponse<ResError>, e: Error) {
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
  error: AxiosError,
  toast: CreateStandAloneToastParam
) {
  if (error.response) {
    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
    // Node.js의 http.ClientRequest 인스턴스입니다.
    console.log(error.request);
  } else {
    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
    console.log("Error", error.message);
  }
}

type YoutubeVideoWithChannel = YoutubeVideo & {
  channel: YoutubeChannel;
};

type VideoWithInfo = Video & {
  youtubeVideo?: YoutubeVideoWithChannel | null;
};

type VideoWithCount = Video & {
  youtubeVideo?: YoutubeVideoWithChannel | null;
  _count: { requests: number; subs: number };
};

export type VideoWithRequest = VideoWithInfo & {
  _count: { requests: number; points: number };
};

type RequestWithUserCount = Request & {
  _count: { users: number };
};

type RequestWithUserCountAndYoutube = RequestWithUserCount & {
  video?: VideoWithInfo;
};

type FileWithUrl = File & {
  url: string;
};

type SubWithVideo = Sub & {
  video: VideoWithInfo;
};

type SubWithFileUrl = Sub & {
  url: string;
};

type SubWithVideoWithUser = SubWithVideo & {
  user: User;
};

export type UserWithCount = User & {
  _count: {
    subs: number;
    views: number;
    fulfilledRequests: number;
  };
};

export type RankQueryData = {
  keyword: string;
};

export type ResFileRead = FileWithUrl;
export type ResFileDelete = File;
export type ResFileSearch = File[];
export type ResFileUpload = File;
export type ResOrder = Order;
export type ResRequest = Request;
export type ResRequestSearch = RequestWithUserCountAndYoutube[];
export type ResSub = Sub;
export type ResSubRead = SubWithFileUrl;
export type ResSubSearch = SubWithVideo[];
export type ResSubView = Sub;
export type ResUser = User;
export type ResVideo = VideoWithInfo;
export type ResVideoSearch = VideoWithCount[];
export type ResRankingSub = SubWithVideoWithUser[];
export type ResRankingVideo = VideoWithRequest[];
export type ResRankingUser = UserWithCount[];
