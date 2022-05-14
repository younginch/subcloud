import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { parseSrt, useInterval } from "../../utils/subtitle";
import { ResSubRead } from "../../utils/types";

type SubtitleData = {
  line: string;
  startTime: number;
  endTime: number;
  text: string;
}[];

export default function ReviewDetail() {
  const router = useRouter();
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [width, setWidth] = useState(1024);
  const [subData, setSubData] = useState<SubtitleData>([]);
  const [subText, setSubText] = useState<string>("");

  useEffect(() => {
    axios
      .get<ResSubRead>(`/api/sub`, { params: { id: router.query.subId } })
      .then((res) => {
        axios.get(res.data.url, { responseType: "blob" }).then((res) => {
          const blob = new Blob([res.data], {
            type: res.headers["content-type"],
          });
          const file = new File([blob], "file.srt");
          file.text().then((text) => {
            setSubData(parseSrt(text));
          });
        });
      });
  }, [router.query.subId]);

  const intervalSub = () => {
    const currentTime = player?.getCurrentTime();
    if (!currentTime) {
      return;
    }

    for (let i = 0; i < subData.length; i++) {
      if (
        subData[i].startTime <= currentTime &&
        currentTime <= subData[i].endTime
      ) {
        console.log(subData[i].text);
        setSubText(subData[i].text);
        break;
      }
    }
  };

  useInterval(intervalSub, 20);

  const opts = {
    width,
    height: width * (9 / 16),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      enablejsapi: 1,
      origin: "http://localhost:3000",
    },
  };

  return (
    <>
      <Box w="100%" h="80vh">
        <YouTube
          videoId="i7muqI90138"
          opts={opts}
          onReady={(event) => setPlayer(event.target)}
        />
        <Text fontSize="4xl" noOfLines={2}>
          {subText}
        </Text>
      </Box>
    </>
  );
}
