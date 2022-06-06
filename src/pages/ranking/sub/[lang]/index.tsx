import axios from "axios";
import { ResRankingSub } from "../../../../utils/types";
import { GetServerSideProps } from "next";

type RankingPageProps = {
  subs: ResRankingSub;
};

export default function RankingPage({ subs }: RankingPageProps) {
  //Pagination

  const subRanking = () => {
    return subs.map((sub) => {
      return (
        <p key={sub.id}>
          views: {sub.views}, platform: {sub.serviceId}, video url:{" "}
          {sub.video.url}, video name:{" "}
          {sub.video.youtubeVideo ? sub.video.youtubeVideo.title : "no title"},
          video channel:{" "}
          {sub.video.youtubeVideo
            ? sub.video.youtubeVideo.channel.title
            : "no title"}
          , user name: {sub.user.name}, user email: {sub.user.email}, user
          image: {sub.user.image}
        </p>
      );
    });
  };

  return (
    <>
      <p>subRanking</p>
      {subRanking()}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<RankingPageProps> = async (
  context
) => {
  const subQuery = `${process.env.NEXTAUTH_URL}/api/ranking/sub/view`;
  const resSubs = await axios.get<ResRankingSub>(subQuery, {
    params: { start: 0, end: 50, lang: context.query.lang },
  });
  const subs = resSubs.data;
  return { props: { subs } };
};
