/* eslint-disable import/prefer-default-export */
import algoliasearch from "algoliasearch";
import { ResVideo } from "./types";

const client = algoliasearch(
  process.env.ALGOLIA_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
);
const videoIndex = client.initIndex("video");
const channelIndex = client.initIndex("channel");

export function saveVideoToAlgolia(video: ResVideo) {
  videoIndex.saveObject(
    {
      objectID: `${video.url}`,
      servicdId: video.serviceId,
      videoId: video.videoId,
      title: video.youtubeVideo?.title,
      description: video.youtubeVideo?.description,
      channelTitle: video.youtubeVideo?.channel.title,
      channelDescription: video.youtubeVideo?.channel.description,
    },
    {
      autoGenerateObjectIDIfNotExist: true,
    }
  );

  channelIndex.saveObject({
    objectID: `${video.serviceId}/${video.youtubeVideo?.channel.id}`,
    title: video.youtubeVideo?.channel.title,
    description: video.youtubeVideo?.channel.description,
  });
}

export function searchFromVideo(query: string) {
  return videoIndex.search(query);
}
