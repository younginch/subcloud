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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { joiResolver } from "@hookform/resolvers/joi";
import { Role } from "@prisma/client";
import { FiSend, FiUpload } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import useSWR from "swr";
import axios from "axios";
import { useRef } from "react";
import { VideoCreateSchema } from "../../utils/schema";
import CreateHeader from "../../components/create/createHeader";
import { PageOptions, ResRankingVideo } from "../../utils/types";
import SwingProvider from "../../components/swingProvider";
import EventNotice from "../../components/create/eventNotice";
import MyRequest from "../../components/create/myRequest";
import MyUpload from "../../components/create/myUpload";
import RequestMarquee from "../../components/requestMarquee";

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
  const ref = useRef<HTMLInputElement>(null);

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
                    lg: "70vw",
                    xl: "65vw",
                  }}
                  maxW="1000px"
                  h={{ base: "50px", sm: "60px", md: "75px" }}
                  fontSize={{ base: "15px", sm: "20px", md: "25px" }}
                  borderRadius="5em"
                  outline="2px solid #ccccff"
                  pr="70px"
                  shadow="md"
                  {...register("url", {
                    required: "This is required",
                  })}
                  textAlign="center"
                  ref={ref}
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
        {router.query.next === "request" ? (
          <MyRequest inputRef={ref} />
        ) : (
          <MyUpload />
        )}
        <RequestMarquee videos={topVideos} />
      </Stack>
    </Box>
  );
}

VideoCreate.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
