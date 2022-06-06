import axios from "axios";
import {
  Box,
  useColorModeValue,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  ResRankingSub,
  ResRankingVideo,
  ResRankingUser,
} from "../../utils/types";
import { GetServerSideProps } from "next";
import { Select } from "@chakra-ui/react";
import { DashboardTableRow } from "../../components/dashBoardTableRow";
import { useEffect, useState } from "react";
import RankPagination from "../../components/rankPagination";

type SSRPageProps = {
  subs: ResRankingSub;
  videos: ResRankingVideo;
  users: ResRankingUser;
};

export default function RankingPage({ subs, videos, users }: SSRPageProps) {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Title", "Language", "Requests", "Points"];

  //Pagination
  const [pageIndex, gotoPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageCount, setPageCount] = useState<number>(100);

  const router = useRouter();
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];
  const handleSelectLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (lang === "All Lang") router.push(`ranking`);
    else router.push(`ranking/${lang}`);
  };

  const handleSelectSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    setPageSize(size);
    setPageCount(Math.floor((videos.length + size - 1) / size));
  };

  useEffect(() => {
    setPageCount(Math.floor((videos.length + pageSize - 1) / pageSize));
  }, [pageSize, videos]);

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
      <HStack>
        <Select
          w={{ sm: "200px" }}
          value="All Lang"
          onChange={handleSelectLang}
        >
          {selectList.map((item_lang) => (
            <option key={item_lang} value={item_lang}>
              Lang : {item_lang}
            </option>
          ))}
        </Select>
        <Select
          w={{ sm: "150px" }}
          value={pageSize}
          onChange={handleSelectSize}
        >
          {[10, 20, 30, 40, 50].map((item) => (
            <option key={item} value={item}>
              Show {item}
            </option>
          ))}
        </Select>
      </HStack>
      <Box
        p={{ base: "10px", md: "50px", lg: "100px" }}
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" ps="0px">
              {captions.map((caption, idx) => {
                return (
                  <Th
                    color="gray.400"
                    key={idx}
                    fontWeight="bold"
                    fontSize={{ base: "15px", md: "20px" }}
                  >
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {videos
              .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
              .map((video) => {
                return (
                  <DashboardTableRow
                    key={video.videoId}
                    name={
                      video.youtubeVideo ? video.youtubeVideo.title : "no title"
                    }
                    platform={video.serviceId}
                    requests={video._count.requests}
                    points={video._count.points}
                    url={video.url}
                  />
                );
              })}
          </Tbody>
        </Table>
      </Box>
      <RankPagination
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageSize={pageSize}
      />
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
