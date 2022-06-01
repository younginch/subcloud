import Layout from "../components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ResRankingSub } from "../utils/types";

export default function RankingPage() {
  const router = useRouter();
  const [subs, setSubs] = useState<ResRankingSub>([]);
  useEffect(() => {
    axios
      .get<ResRankingSub>("/api/ranking/sub/view?start=0&end=50", {
        params: { query: router.query.q },
      })
      .then((res) => {
        console.log(res.data);
        setSubs(res.data);
      });
  }, [router.query.q]);

  return (
    <>
      {subs.map((sub) => {
        return (
          <p key={sub.id}>
            views: {sub.views}, platform: {sub.serviceId}, video url:{" "}
            {sub.video.url}, video name:{" "}
            {sub.video.youtubeVideo ? sub.video.youtubeVideo.title : "no title"}
            , video channel:{" "}
            {sub.video.youtubeVideo
              ? sub.video.youtubeVideo.channel.title
              : "no title"}
            , user name: {sub.user.name}, user email: {sub.user.email}, user
            image: {sub.user.image}
          </p>
        );
      })}
    </>
  );
}
