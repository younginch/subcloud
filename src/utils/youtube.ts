/* eslint-disable import/prefer-default-export */
import axios from "axios";

function youtubeDurationToSeconds(duration: string): number {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const regexResult = regex.exec(duration);
  if (!regexResult) {
    return 0;
  }
  const hours = parseInt(regexResult[1] || "0", 10);
  const minutes = parseInt(regexResult[2] || "0", 10);
  const seconds = parseInt(regexResult[3] || "0", 10);
  return hours * 60 * 60 + minutes * 60 + seconds;
}

type YoutubeVideoData = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  duration: number;
  viewCount: number;
  likeCount: number;
};

export async function getYoutubeVideoData(
  videoId: string
): Promise<YoutubeVideoData> {
  const videoRes =
    await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}
      &part=snippet,contentDetails,statistics,liveStreamingDetails`);
  if (!videoRes.data.items) {
    throw new Error("No video found");
  }
  const videoData = videoRes.data.items[0];
  if (videoData.snippet.liveBroadcastContent !== "none") {
    throw new Error("Video is a live broadcast");
  }
  return {
    publishedAt: videoData.snippet.publishedAt,
    channelId: videoData.snippet.channelId,
    title: videoData.snippet.title,
    description: videoData.snippet.description,
    duration: youtubeDurationToSeconds(videoData.contentDetails.duration),
    viewCount: Number.parseInt(videoData.statistics.viewCount ?? 0, 10),
    likeCount: Number.parseInt(videoData.statistics.likeCount ?? 0, 10),
  };
}

type YoutubeChannelData = {
  title: string;
  description: string;
  thumbnailUrl: string;
  subscriberCount: number;
  channelUrl: string;
  bannerUrl: string;
};

export async function getYoutubeChannelData(
  channelId: string
): Promise<YoutubeChannelData> {
  const channelRes = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,statistics,brandingSettings`
  );
  if (!channelRes.data.items) {
    throw new Error("No channel found");
  }
  const channelData = channelRes.data.items[0];
  return {
    title: channelData.snippet.title,
    description: channelData.snippet.description,
    thumbnailUrl: channelData.snippet.thumbnails.medium.url,
    subscriberCount: Number.parseInt(
      channelData.statistics.subscriberCount ?? 0,
      10
    ),
    channelUrl: `https://www.youtube.com/channel/${channelId}`,
    bannerUrl: channelData.brandingSettings.image?.bannerExternalUrl,
  };
}
