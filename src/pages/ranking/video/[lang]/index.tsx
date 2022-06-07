import axios from "axios";
import { PageOptions, ResRankingVideo } from "../../../../utils/types";
import { GetServerSideProps } from "next";

type VideoRankingPageProps = {
  videos: ResRankingVideo;
};

export default function VideoRankingPage({ videos }: VideoRankingPageProps) {
  //Pagination
  return <>곧 없어질 페이지입니다.</>;
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

VideoRankingPage.options = { auth: false, hideTitle: true } as PageOptions;
