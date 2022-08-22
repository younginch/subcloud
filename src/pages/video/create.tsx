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
  useMediaQuery,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { joiResolver } from "@hookform/resolvers/joi";
import { Role } from "@prisma/client";
import { FiSend, FiUpload } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import useSWR from "swr";
import axios from "axios";
import { VideoCreateSchema } from "../../utils/schema";
import CreateHeader from "../../components/create/createHeader";
import { PageOptions, ResRankingVideo } from "../../utils/types";
import SwingProvider from "../../components/swingProvider";
import EventNotice from "../../components/create/eventNotice";
import MyRequest from "../../components/create/myRequest";
import MyUpload from "../../components/create/myUpload";
import RequestMarquee from "../../components/requestMarquee";
import { YoutubeIcon } from "../../components/icons/customIcons";

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
    <Box alignItems="center" w="100%">
      <Stack
        bg={useColorModeValue("gray.50", "gray.900")}
        minH="calc(100vh - 54px)"
        spacing={0}
      >
        <Stack
          alignItems="center"
          w="100%"
          bg={useColorModeValue("blue.100", "gray.600")}
          pt="4vh"
          pb="10vh"
        >
          <CreateHeader type={router.query.next as "request" | "sub"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isInvalid={errors.url !== undefined}
              display="flex"
              flexDir="column"
              alignItems="center"
            >
              <HStack spacing={{ base: 2, sm: 5, md: 10 }} position="relative">
                <Input
                  id="url"
                  placeholder={t(`search_box_${router.query.next}`)}
                  _placeholder={{
                    color: useColorModeValue("gray.800", "gray.400"),
                  }}
                  w={{
                    base: "calc(90vw - 60px)",
                    sm: "75vw",
                    md: "70vw",
                    lg: "65vw",
                    xl: "60vw",
                  }}
                  maxW="1000px"
                  h={{ base: "50px", sm: "60px", md: "65px" }}
                  fontSize={{ base: "15px", sm: "20px", md: "25px" }}
                  borderRadius="10px"
                  {...register("url", {
                    required: "This is required",
                  })}
                  textAlign="center"
                  bg="white"
                />
                {isPc && (
                  <Stack position="absolute" w="35px" h="35px" left="-17px">
                    <YoutubeIcon size="full" />
                  </Stack>
                )}
                <Button
                  bg="black"
                  _hover={{
                    bg: "gray.800",
                  }}
                  color="white"
                  isLoading={isSubmitting}
                  type="submit"
                  fontSize="20px"
                  h={{ base: "50px", sm: "60px", md: "65px" }}
                  minW={{ base: "35px", md: "50px" }}
                  w="fit-content"
                >
                  <SwingProvider>
                    {router.query.next === "request" ? (
                      isPc ? (
                        <Text>{t("request")}</Text>
                      ) : (
                        <FiSend />
                      )
                    ) : isPc ? (
                      <Text>{t("upload")}</Text>
                    ) : (
                      <FiUpload />
                    )}
                  </SwingProvider>
                </Button>
              </HStack>
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
        <RequestMarquee videos={topVideos} mt="0px !important" />
      </Stack>
    </Box>
  );
}

VideoCreate.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: false,
} as PageOptions;
