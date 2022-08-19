import { YoutubeChannel } from "@prisma/client";
import {
  handleRoute,
  RouteParams,
  SubErrorType,
} from "../../../../utils/types";

async function GetChannel({ req, res, prisma }: RouteParams<YoutubeChannel>) {
  const { channelId } = req.query;
  const channel = await prisma.youtubeChannel.findUnique({
    where: {
      id: channelId as string,
    },
  });
  if (!channel) {
    return res
      .status(404)
      .json({
        error: SubErrorType.FormValidation,
        message: "channel not found",
      });
  }
  return res.status(200).json(channel);
}

export default handleRoute({
  GET: GetChannel,
});
