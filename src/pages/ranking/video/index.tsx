import axios from "axios";
import { PageOptions, ResRankingVideo } from "../../../utils/types";
import { GetServerSideProps } from "next";
import VideoRankTable from "../../../components/ranking/videoRankTable";

type RankingPageProps = {
  videos: ResRankingVideo;
};

export default function RankingPage({ videos }: RankingPageProps) {
  //Pagination
  return <VideoRankTable videos={videos} />;
}

export const getServerSideProps: GetServerSideProps<RankingPageProps> = async (
  context
) => {
  const videoRequestQuery = `${process.env.NEXTAUTH_URL}/api/ranking/video/request`;
  const videoPointQuery = `${process.env.NEXTAUTH_URL}/api/ranking/video/point`;
  const resVideos = await axios.get<ResRankingVideo>(videoRequestQuery, {
    params: { start: 0, end: 50 },
  });
  const videos = resVideos.data;
  return { props: { videos } };
};

RankingPage.options = { auth: false } as PageOptions;
