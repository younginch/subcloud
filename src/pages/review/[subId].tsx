import {
  Box,
  Button,
  CircularProgress,
  Flex,
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
  useMediaQuery,
  useToast,
  useColorModeValue,
  Center,
  Spacer,
  useInterval,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Review,
  ReviewContent,
  ReviewType,
  Role,
  SubStatus,
} from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import YouTube, { YouTubePlayer } from "react-youtube";
import useSWR, { mutate } from "swr";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillTool } from "react-icons/ai";
import { MdReport } from "react-icons/md";
import { SRTContent, SRTFile } from "@younginch/subtitle";
import { PageOptions, ResSubRead } from "../../utils/types";
import { ReviewCreateSchema } from "../../utils/schema";
import CommentComponent from "../../components/review/commentComponent";

type ReviewAddFormData = {
  type: ReviewType;
  content: string;
  startTime?: number;
  endTime?: number;
};

type ReviewAddFormProps = {
  subId: string;
  reviewId?: string;
};

function ReviewAddForm({ subId, reviewId }: ReviewAddFormProps) {
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
  }) =>
    new Promise((resolve, reject) => {
      axios
        .post(`/api/review?subId=${subId}&reviewId=${reviewId}`, {
          type,
          content,
          startTime,
          endTime,
        })
        .then((res) => {
          mutate(`/api/review?subId=${subId}`);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  return (
    <Box
      bg={useColorModeValue("white", "#1F2733")}
      boxShadow="lg"
      rounded="xl"
      p={4}
    >
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
        <HStack h="80px">
          <FormControl isInvalid={errors.startTime !== undefined}>
            <FormLabel htmlFor="startTime">Start Time</FormLabel>
            <Input type="number" id="startTime" {...register("startTime")} />
            <FormErrorMessage>
              {errors.startTime && errors.startTime.message}
            </FormErrorMessage>
          </FormControl>
          <Button h="80%">현재 시간</Button>
        </HStack>
        <HStack h="80px">
          <FormControl isInvalid={errors.endTime !== undefined}>
            <FormLabel htmlFor="endTime">End Time</FormLabel>
            <Input type="number" id="endTime" {...register("endTime")} />
            <FormErrorMessage>
              {errors.endTime && errors.endTime.message}
            </FormErrorMessage>
          </FormControl>
          <Button h="80%">현재 시간</Button>
        </HStack>
        <Center>
          <Button
            mt={3}
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            w="80%"
            colorScheme="blue"
          >
            추가
          </Button>
        </Center>
      </form>
    </Box>
  );
}

type ReviewListProps = {
  reviewContents: ReviewContent[] | undefined;
  subId: string;
};

function ReviewList({ reviewContents, subId }: ReviewListProps) {
  const toast = useToast();

  function onDelete(id: string) {
    axios
      .delete(`/api/review?id=${id}`)
      .then(() => {
        mutate(`/api/review?subId=${subId}`);
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
    <Box boxShadow="lg" rounded="xl" overflow="hidden">
      <Stack
        bg={useColorModeValue("gray.200", "gray.700")}
        h="40px"
        justifyContent="center"
      >
        <Text textAlign="center" h="fit-content" fontWeight="bold">
          {reviewContents && reviewContents?.length > 0
            ? "리뷰 목록"
            : "아직 리뷰가 없습니다"}
        </Text>
      </Stack>
      <List maxH="300px" overflow="auto">
        {reviewContents?.map((reviewContent) => (
          <Box key={reviewContent.id}>
            <CommentComponent
              key={reviewContent.id}
              content={reviewContent}
              onClick={() => {
                onDelete(reviewContent.id);
              }}
            />
          </Box>
        ))}
      </List>
    </Box>
  );
}

type YoutubeOptions =
  | {
      [x: string]: any;
    }
  | null
  | undefined;

type ReviewWithContent = Review & { reviewContents?: ReviewContent[] };

export default function ReviewDetail() {
  const router = useRouter();
  const toast = useToast();
  const [options, setOptions] = useState<YoutubeOptions>();
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [sub, setSub] = useState<ResSubRead>();
  const [contentArray, setContentArray] = useState<SRTContent[]>([]);
  const [subText, setSubText] = useState<string>("");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const { data } = useSWR<ReviewWithContent[]>(
    `/api/review?subId=${router.query.subId}`
  );
  const review = data ? data[0] : undefined;

  useEffect(() => {
    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        enablejsapi: 1,
        origin: window?.location?.origin,
      },
    };
    setOptions(opts);
  }, []);

  useEffect(() => {
    axios
      .get<ResSubRead>(`/api/user/sub`, { params: { id: router.query.subId } })
      .then((res) => {
        setSub(res.data);
        axios.get(res.data.url, { responseType: "blob" }).then((res) => {
          const blob = new Blob([res.data], {
            type: res.headers["content-type"],
          });
          const file = new File([blob], "file.srt");
          file.text().then((text) => {
            setContentArray(SRTFile.fromText(text).array);
          });
        });
      });
  }, [router.query.subId]);

  const intervalSub = () => {
    const currentTime = (player?.getCurrentTime() ?? 0) * 1000;
    if (!currentTime) {
      return;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < contentArray.length; i++) {
      if (
        contentArray[i].startTime <= currentTime &&
        currentTime <= contentArray[i].endTime
      ) {
        setSubText(contentArray[i].toText());
        break;
      }
    }
  };

  useInterval(intervalSub, 20);

  function onSubmit(subStatus: SubStatus) {
    axios
      .post(`/api/review/sub?subId=${sub?.id}`, {
        subStatus,
        reviewId: review?.id,
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
    <Flex direction={isLargerThan1280 ? "row" : "column"} ps={5} pt={5} pb={5}>
      <Stack>
        <Box w="100%" h="fit-content">
          {options && sub ? (
            <YouTube
              videoId={sub?.videoId}
              opts={options}
              onReady={(event) => setPlayer(event.target)}
              className="youtubeContainer"
            />
          ) : (
            <CircularProgress />
          )}
          <Text
            fontSize="4xl"
            noOfLines={2}
            w={isLargerThan1280 ? "900px" : "100%"}
          >
            {subText}
          </Text>
        </Box>
      </Stack>
      <Stack
        w={isLargerThan1280 ? "calc(100vw - 1000px)" : "100%"}
        minW="380px"
        maxW={isLargerThan1280 ? "100vw" : "700px"}
        ml={isLargerThan1280 ? "20px" : "0px"}
      >
        <HStack>
          <Button
            onClick={() => {
              onSubmit(SubStatus.Rejected);
            }}
            colorScheme="orange"
            leftIcon={<AiFillTool />}
            w="25%"
            maxW="150px"
          >
            반려
          </Button>
          <Button
            onClick={() => {
              onSubmit(SubStatus.Reported);
            }}
            colorScheme="red"
            leftIcon={<MdReport />}
            w="20%"
            maxW="150px"
          >
            신고
          </Button>
          <Spacer />
          <Button
            onClick={() => {
              onSubmit(SubStatus.Approved);
            }}
            colorScheme="green"
            leftIcon={<BsCheckCircleFill />}
            w="25%"
            maxW="150px"
          >
            승인
          </Button>
        </HStack>
        <ReviewAddForm
          subId={router.query.subId as string}
          reviewId={review?.id}
        />
        <ReviewList
          subId={router.query.subId as string}
          reviewContents={review?.reviewContents}
        />
      </Stack>
    </Flex>
  );
}

ReviewDetail.options = { role: Role.Reviewer, hideTitle: true } as PageOptions;
