import axios from "axios";
import { useRouter } from "next/router";
import {
  ResRankingSub,
  ResRankingVideo,
  ResRankingUser,
} from "../../utils/types";
import { GetServerSideProps } from "next";
import { Select } from "@chakra-ui/react";
import VideoRankTable from "../../components/ranking/videoRankTable";
import UserRankTable from "../../components/ranking/userRankTable";

type SSRPageProps = {
  subs: ResRankingSub;
  videos: ResRankingVideo;
  users: ResRankingUser;
};

export default function RankingPage({ subs, videos, users }: SSRPageProps) {
  //Pagination

  const router = useRouter();
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];
  const handleSelectLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (lang === "All Lang") router.push(`ranking`);
    else router.push(`ranking/${lang}`);
  };

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

  const videoRanking = () => {
    return videos.map((video) => {
      return (
        <p key={video.videoId}>
          requests: {video._count.requests}, points: {video._count.points},
          platform: {video.serviceId}, video url: {video.url}, video name:{" "}
          {video.youtubeVideo ? video.youtubeVideo.title : "no title"}, video
          channel:{" "}
          {video.youtubeVideo ? video.youtubeVideo.channel.title : "no title"}
        </p>
      );
    });
  };

  const userRanking = () => {
    return users.map((user) => {
      return (
        <p key={user.id}>
          name: {user.name}, email: {user.email}, image: {user.image}, subs:{" "}
          {user._count.subs}, views: {user._count.views}, fulfilledRequests:{" "}
          {user._count.fulfilledRequests}
        </p>
      );
    });
  };

  return (
    <>
      <Select
        bg="gray.800"
        color="white"
        w="100%"
        h="30px"
        onChange={handleSelectLang}
        value="All Lang"
      >
        {selectList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Select>
      <p>subRanking</p>
      {subRanking()}
      <p>videoRanking</p>
      {videoRanking()}
      <p>userRanking</p>
      {userRanking()}
      <UserRankTable users={users} />
      <VideoRankTable videos={videos} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SSRPageProps> = async (
  context
) => {
  const subQuery = `${process.env.NEXTAUTH_URL}/api/ranking/sub/view`;
  const videoRequestQuery = `${process.env.NEXTAUTH_URL}/api/ranking/video/request`;
  const videoPointQuery = `${process.env.NEXTAUTH_URL}/api/ranking/video/point`;
  const userViewQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/view`;
  const userSubQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/sub`;
  const userFulfilledRequestsQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/fulfilledRequests`;
  const resSubs = await axios.get<ResRankingSub>(subQuery, {
    params: { start: 0, end: 50 },
  });
  const subs = resSubs.data;
  const resVideos = await axios.get<ResRankingVideo>(videoRequestQuery, {
    params: { start: 0, end: 50 },
  });
  const videos = resVideos.data;
  const resUsers = await axios.get<ResRankingUser>(userViewQuery, {
    params: { start: 0, end: 50 },
  });
  const users = resUsers.data;
  return { props: { subs, videos, users } };
};
