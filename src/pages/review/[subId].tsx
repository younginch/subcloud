import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  List,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { Review, ReviewType, Role, SubStatus } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import YouTube, { YouTubePlayer } from "react-youtube";
import useSWR, { mutate } from "swr";
import { ReviewCreateSchema } from "../../utils/schema";
import { parseSrt, useInterval } from "../../utils/subtitle";
import { PageOptions, ResSubRead } from "../../utils/types";

type ReviewAddFormData = {
  type: ReviewType;
  content: string;
  startTime?: number;
  endTime?: number;
};

type ReviewAddFormProps = {
  subId: string;
};

function ReviewAddForm({ subId }: ReviewAddFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ReviewAddFormData>({ resolver: joiResolver(ReviewCreateSchema) });

  const onSubmit: SubmitHandler<ReviewAddFormData> = ({
    type,
    content,
    startTime,
    endTime,
  }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/review?subId=${subId}`, {
          type,
          content,
          startTime: Number(startTime),
          endTime: Number(endTime),
        })
        .then((res) => {
          mutate(`/api/review?subId=${subId}`);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return (
    <Box borderWidth="1px">
      <form>
        <FormControl isInvalid={errors.type !== undefined}>
          <FormLabel htmlFor="type">Type</FormLabel>
          <Select
            id="type"
            placeholder="Select review type"
            {...register("type")}
          >
            <option id="Mistranslation">Mistranslation</option>
            <option id="IncorrectTiming">IncorrectTiming</option>
            <option id="NoSubtitle">NoSubtitle</option>
            <option id="IncorrectTitle">IncorrectTitle</option>
            <option id="IncorrectLanguage">IncorrectLanguage</option>
            <option id="GuidelineViolation">GuidelineViolation</option>
            <option id="Etc">Etc</option>
          </Select>
          <FormErrorMessage>
            {errors.type && errors.type.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.content !== undefined}>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Textarea {...register("content")} />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.startTime !== undefined}>
          <FormLabel htmlFor="startTime">Start Time</FormLabel>
          <Input type="number" id="startTime" {...register("startTime")} />
          <FormErrorMessage>
            {errors.startTime && errors.startTime.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.endTime !== undefined}>
          <FormLabel htmlFor="endTime">End Time</FormLabel>
          <Input type="number" id="endTime" {...register("endTime")} />
          <FormErrorMessage>
            {errors.endTime && errors.endTime.message}
          </FormErrorMessage>
        </FormControl>
        <Button onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
          추가
        </Button>
      </form>
    </Box>
  );
}

type ReviewListProps = {
  subId: string;
};

function ReviewList({ subId }: ReviewListProps) {
  const toast = useToast();
  const { data, mutate } = useSWR<Review[]>(`/api/review?subId=${subId}`);

  function onDelete(id: string) {
    axios
      .delete(`/api/review?id=${id}`)
      .then(() => {
        mutate();
      })
      .catch((err) => {
        toast({
          title: "삭제에 실패했습니다.",
          description: err.message,
          status: "error",
        });
      });
  }

  return (
    <List>
      {data?.map((review) => (
        <Box key={review.id}>
          <Text>{review.startTime}</Text>
          <Text>{review.endTime}</Text>
          <Text>{review.type}</Text>
          <Text>{review.content}</Text>
          <Button
            onClick={() => {
              onDelete(review.id);
            }}
          >
            삭제
          </Button>
        </Box>
      ))}
    </List>
  );
}

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
  const toast = useToast();
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

  function onSubmit(subStatus: SubStatus) {
    axios
      .post(`/api/sub/review?subId=${sub?.id}`, {
        subStatus,
      })
      .then(() => {
        toast({
          title: "승인/거절/신고되었습니다",
          description: "승인/거절/신고가 완료되었습니다",
          status: "success",
        });
        router.back();
      })
      .catch((err) => {
        toast({
          title: "처리 실패",
          description: err.message,
          status: "error",
        });
      });
  }

  return (
    <HStack>
      <Stack>
        <Box w="100%" h="80vh">
          {options && sub ? (
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
        <ReviewList subId={router.query.subId as string} />
        <ReviewAddForm subId={router.query.subId as string} />
        <HStack>
          <Button
            onClick={() => {
              onSubmit(SubStatus.Approved);
            }}
          >
            승인
          </Button>
          <Button
            onClick={() => {
              onSubmit(SubStatus.Rejected);
            }}
          >
            반려
          </Button>
          <Button
            onClick={() => {
              onSubmit(SubStatus.Reported);
            }}
          >
            신고
          </Button>
        </HStack>
      </Stack>
    </HStack>
  );
}

ReviewDetail.options = { role: Role.Reviewer } as PageOptions;
