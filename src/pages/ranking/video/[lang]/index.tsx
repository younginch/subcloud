import axios from "axios";
import { ResRankingVideo } from "../../../../utils/types";
import { GetServerSideProps } from "next";
import VideoRankTable from "../../../../components/ranking/videoRankTable";

type VideoRankingPageProps = {
  videos: ResRankingVideo;
};

export default function VideoRankingPage({ videos }: VideoRankingPageProps) {
  //Pagination
  return <VideoRankTable videos={videos} />;
}

export const getServerSideProps: GetServerSideProps<
  VideoRankingPageProps
> = async (context) => {
  const videoRequestQuery = `${process.env.NEXTAUTH_URL}/api/ranking/video/request`;
  const videoPointQuery = `${process.env.NEXTAUTH_URL}/api/ranking/video/point`;
  const resVideos = await axios.get<ResRankingVideo>(videoRequestQuery, {
    params: { start: 0, end: 50, lang: context.query.lang },
  });
  const videos = resVideos.data;
  return { props: { videos } };
};

VideoRankingPage.hideTitle = true;
