import Layout from "../components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ResRankingSub, ResRankingVideo, ResRankingUser } from "../utils/types";

export default function RankingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<string | null>(null);
  const [subs, setSubs] = useState<ResRankingSub>([]);
  const [videos, setVideos] = useState<ResRankingVideo>([]);
  const [users, setUsers] = useState<ResRankingUser>([]);

  useEffect(() => {
    const subQuery = `/api/ranking/sub/view?start=0&end=50${
      lang === null ? "" : "&lang=" + lang
    }`;
    const videoRequestQuery = `/api/ranking/video/request?start=0&end=50${
      lang === null ? "" : "&lang=" + lang
    }`;
    const videoPointQuery = `/api/ranking/video/point?start=0&end=50${
      lang === null ? "" : "&lang=" + lang
    }`;
    const userViewQuery = `/api/ranking/user/view?start=0&end=50${
      lang === null ? "" : "&lang=" + lang
    }`;
    axios
      .get<ResRankingSub>(subQuery, {
        params: { query: router.query.q },
      })
      .then((res) => {
        console.log(res.data);
        setSubs(res.data);
      });
    axios
      .get<ResRankingVideo>(videoRequestQuery, {
        params: { query: router.query.q },
      })
      .then((res) => {
        console.log(res.data);
        setVideos(res.data);
      });
    axios
      .get<ResRankingUser>(userViewQuery, {
        params: { query: router.query.q },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
  }, [router.query.q, lang]);

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
          {user._count.subs}, views: {user._count.views}, fullfills:{" "}
          {user._count.fullfill}
        </p>
      );
    });
  };

  return (
    <>
      <button onClick={() => setLang("en")}>lang</button>
      <p>subRanking</p>
      {subRanking()}
      <p>videoRanking</p>
      {videoRanking()}
      <p>userRanking</p>
      {userRanking()}
    </>
  );
}
