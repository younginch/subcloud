import type { CreateStandAloneToastParam } from "@chakra-ui/react";
import { InfoYoutube, Video } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import { AxiosResponse } from "axios";
import type { NextApiResponse } from "next";

export default interface ResError {
  error: string;
  log?: string;
}

enum ResErrorType {
  NotFound,
}

export function handleServerError(res: NextApiResponse, e: any) {
  if (e instanceof PrismaClientValidationError) {
    return res.status(400).json({ error: "Validation Error" });
  } else if (e instanceof PrismaClientKnownRequestError) {
  } else if (e instanceof PrismaClientUnknownRequestError) {
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export function handleClientError(
  res: AxiosResponse,
  toast: CreateStandAloneToastParam
) {}

export type VideoWithInfo = Video & { info: InfoYoutube };
