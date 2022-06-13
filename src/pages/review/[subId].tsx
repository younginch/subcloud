import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { parseSrt, useInterval } from "../../utils/subtitle";
import { PageOptions, ResSub, ResSubRead } from "../../utils/types";

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
  const [sub, setSub] = useState<ResSubRead>();
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
        setSub(res.data);
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
    <HStack>
      <Stack>
        <Box w="100%" h="80vh">
          {options ? (
            <YouTube
              videoId={sub?.videoId}
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
      </Stack>
      <Stack>
        <Box borderWidth="1px">
          <form>
            <FormControl>
              <FormLabel htmlFor="type">Type</FormLabel>
              <Select id="type" placeholder="Select review type">
                <option id="Mistranslation">Mistranslation</option>
                <option id="IncorrectTiming">IncorrectTiming</option>
                <option id="NoSubtitle">NoSubtitle</option>
                <option id="IncorrectTitle">IncorrectTitle</option>
                <option id="IncorrectLanguage">IncorrectLanguage</option>
                <option id="GuidelineViolation">GuidelineViolation</option>
                <option id="Etc">Etc</option>
              </Select>
              <FormErrorMessage>{}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Textarea />
              <FormErrorMessage>{}</FormErrorMessage>
            </FormControl>
            <Button type="submit">추가</Button>
          </form>
        </Box>
        <Button>반려</Button>
      </Stack>
    </HStack>
  );
}

ReviewDetail.options = { role: Role.Reviewer } as PageOptions;
