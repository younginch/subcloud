import { InfoYoutube, Video } from "@prisma/client";

export default interface ResError {
  error: string;
  log?: string;
}

enum ResErrorType {
  NotFound,
}

export type VideoWithInfo = Video & { info: InfoYoutube };
