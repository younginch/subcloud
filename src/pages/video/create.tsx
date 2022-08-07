import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  useColorModeValue,
  useToast,
  Text,
  HStack,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { joiResolver } from "@hookform/resolvers/joi";
import { Role } from "@prisma/client";
import { FiSend, FiUpload } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import ISO6391 from "iso-639-1";
import Marquee from "react-fast-marquee";
import useSWR from "swr";
import { VideoCreateSchema } from "../../utils/schema";
import CreateHeader from "../../components/create/createHeader";
import { PageOptions, ResRankingVideo } from "../../utils/types";
import SwingProvider from "../../components/swingProvider";
import EventNotice from "../../components/create/eventNotice";
import RequestCard from "../../components/requestCard";
import MyRequest from "../../components/create/myRequest";
import MyUpload from "../../components/create/myUpload";

type FormData = {
  url: string;
};

export default function VideoCreate() {
  const { t } = useTranslation("create");
  const router = useRouter();
  const toast = useToast();
  const isEvent = false; // TODO: 이벤트 종류를 받아오는 API 추가 필요
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: joiResolver(VideoCreateSchema) });
  const [isPc] = useMediaQuery("(min-width: 850px)");
  const { data: topVideos } = useSWR<ResRankingVideo>(
    `/api/public/ranking/video/request?start=0&end=10&lang=All Lang&order=desc`
  );

  function onSubmit(values: FormData) {
    return new Promise<void>((resolve, reject) => {
      const { url } = values;
      axios
        .post("/api/user/video", { url })
        .then((res) => {
          resolve(res.data);
          if (router.query.next === "request") {
            router.push(
              `/video/${res.data.serviceId}/${res.data.videoId}/request/create`
            );
          } else if (router.query.next === "sub") {
            router.push(
              `/video/${res.data.serviceId}/${res.data.videoId}/sub/create`
            );
          }
        })
        .catch((err) => {
          toast({
            title: "오류",
            description: err.response.data.message,
            status: "error",
          });
          reject(err.response.data);
        });
    });
  }

  return (
    <Box alignItems="center" w="100%" pt="4vh">
      <Stack>
        <Stack alignItems="center" w="100%" m="auto">
          <CreateHeader type={router.query.next as "request" | "sub"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isInvalid={errors.url !== undefined}
              display="flex"
              flexDir="column"
              alignItems="center"
            >
              <Box
                flexDir="column"
                display="flex"
                position="relative"
                alignItems="flex-end"
                justifyContent="center"
              >
                <Input
                  id="url"
                  className="create-glassmorphism"
                  placeholder={t(`search_box_${router.query.next}`)}
                  _placeholder={{
                    color: useColorModeValue("gray.800", "gray.400"),
                  }}
                  w={{
                    base: "90vw",
                    sm: "85vw",
                    md: "80vw",
                    lg: "60vw",
                    xl: "50vw",
                  }}
                  bg={useColorModeValue(
                    "rgba( 255, 255, 255, 0.2 )",
                    "rgba( 60, 55, 66, 0.7 )"
                  )}
                  maxW="800px"
                  h={{ base: "50px", sm: "60px", md: "65px" }}
                  fontSize={{ base: "18px", sm: "20px", md: "25px" }}
                  borderRadius="5em"
                  pr="70px"
                  shadow="md"
                  {...register("url", {
                    required: "This is required",
                  })}
                  textAlign="center"
                />
                <Button
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                  fontSize="20px"
                  borderRadius="full"
                  position="absolute"
                  minW={{ base: "35px", md: "50px" }}
                  h={{ base: "35px", md: "50px" }}
                  w="fit-content"
                  mr="15px"
                  zIndex={3}
                >
                  <SwingProvider>
                    {router.query.next === "request" ? (
                      isPc ? (
                        <Text>자막 요청</Text>
                      ) : (
                        <FiSend />
                      )
                    ) : isPc ? (
                      <Text>자막 업로드</Text>
                    ) : (
                      <FiUpload />
                    )}
                  </SwingProvider>
                </Button>
              </Box>
              <Box alignItems="center" fontSize="20px">
                <FormErrorMessage m="auto" fontSize="15px">
                  {errors.url && t("url_error")}
                </FormErrorMessage>
              </Box>
            </FormControl>
          </form>
          {router.query.next === "sub" && isEvent && <EventNotice />}
        </Stack>
        {router.query.next === "request" ? <MyRequest /> : <MyUpload />}
        <Stack
          spacing={10}
          p="50px 12px 80px 12px"
          bg={useColorModeValue("blue.50", "gray.900")}
          mt="50px !important"
        >
          <HStack pl="30px" alignItems="flex-end">
            <Text fontWeight="bold" fontSize={{ base: "25px", md: "30px" }}>
              Top 10 인기 요청 영상🔥
            </Text>
            <NextLink href="/ranking/video" passHref>
              <Link fontSize="lg" ml="15px !important" color="gray.400">
                더보기
              </Link>
            </NextLink>
          </HStack>
          <Marquee gradient={false} pauseOnHover>
            {topVideos?.map((video) => (
              <Box mr="30px" key={video.videoId}>
                <RequestCard
                  title={video.youtubeVideo?.title ?? ""}
                  time={video.youtubeVideo?.duration ?? 0}
                  thumbnail={`https://i.ytimg.com/vi/${video.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
                  link={video.url}
                  requestLang={ISO6391.getNativeName(video.langs)}
                  requestCount={video._count.requests}
                  buttonType={router.query.next}
                  serviceId={video.serviceId}
                  videoId={video.videoId}
                />
              </Box>
            ))}
          </Marquee>
        </Stack>
      </Stack>
    </Box>
  );
}

VideoCreate.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
