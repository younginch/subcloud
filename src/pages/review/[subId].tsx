import { Box, CircularProgress, Text } from "@chakra-ui/react";
import { Role } from "@prisma/client";
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

type YoutubeOptions =
  | {
      [x: string]: any;
    }
  | null
  | undefined;

export default function ReviewDetail() {
  const router = useRouter();
  const [options, setOptions] = useState<YoutubeOptions>();
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [width, setWidth] = useState(1024);
  const [subData, setSubData] = useState<SubtitleData>([]);
  const [subText, setSubText] = useState<string>("");

  useEffect(() => {
    const opts = {
      width,
      height: width * (9 / 16),
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        enablejsapi: 1,
        origin: window?.location?.origin,
      },
    };
    setOptions(opts);
  }, [width]);

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
        setSubText(subData[i].text);
        break;
      }
    }
  };

  useInterval(intervalSub, 20);

  return (
    <>
      <Box w="100%" h="80vh">
        {options ? (
          <YouTube
            videoId="i7muqI90138"
            opts={options}
            onReady={(event) => setPlayer(event.target)}
          />
        ) : (
          <CircularProgress />
        )}
        <Text fontSize="4xl" noOfLines={2}>
          {subText}
        </Text>
      </Box>
    </>
  );
}

ReviewDetail.auth = Role.Reviewer;
