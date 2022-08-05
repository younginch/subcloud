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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { joiResolver } from "@hookform/resolvers/joi";
import { Role } from "@prisma/client";
import { FiUpload } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import { VideoCreateSchema } from "../../utils/schema";
import CreateHeader from "../../components/create/createHeader";
import { PageOptions } from "../../utils/types";
import SwingProvider from "../../components/swingProvider";
import EventNotice from "../../components/create/eventNotice";
import RequestCard from "../../components/requestCard";
import Pagination from "../../components/pagination";
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
                      <Text>자막 요청</Text>
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
        <Stack p={10} spacing={10}>
          <Text fontWeight="bold" fontSize={{ base: "25px", md: "30px" }}>
            다른사람이 요청한 인기 영상
          </Text>
          <Wrap
            spacing={5}
            justify={{ base: "space-evenly", md: "normal" }}
            w="fit-content"
          >
            <WrapItem>
              <RequestCard
                title="창모 - 널 지워야 해"
                time="4:30"
                link="https://www.youtube.com/watch?v=i7muqI90138"
                requestLang="한국어"
                requestCount={100}
                buttonType={router.query.next}
              />
            </WrapItem>
            <WrapItem>
              <RequestCard
                title="창모 - 널 지워야 해"
                time="4:30"
                link="https://www.youtube.com/watch?v=i7muqI90138"
                requestLang="한국어"
                requestCount={100}
                buttonType={router.query.next}
              />
            </WrapItem>
            <WrapItem>
              <RequestCard
                title="창모 - 널 지워야 해"
                time="4:30"
                link="https://www.youtube.com/watch?v=i7muqI90138"
                requestLang="한국어"
                requestCount={100}
                buttonType={router.query.next}
              />
            </WrapItem>
            <WrapItem>
              <RequestCard
                title="창모 - 널 지워야 해"
                time="4:30"
                link="https://www.youtube.com/watch?v=i7muqI90138"
                requestLang="한국어"
                requestCount={100}
                buttonType={router.query.next}
              />
            </WrapItem>
            <WrapItem>
              <RequestCard
                title="창모 - 널 지워야 해"
                time="4:30"
                link="https://www.youtube.com/watch?v=i7muqI90138"
                requestLang="한국어"
                requestCount={100}
                buttonType={router.query.next}
              />
            </WrapItem>
            <WrapItem>
              <RequestCard
                title="창모 - 널 지워야 해"
                time="4:30"
                link="https://www.youtube.com/watch?v=i7muqI90138"
                requestLang="한국어"
                requestCount={100}
                buttonType={router.query.next}
              />
            </WrapItem>
            <WrapItem>
              <RequestCard
                title="창모 - 널 지워야 해"
                time="4:30"
                link="https://www.youtube.com/watch?v=i7muqI90138"
                requestLang="한국어"
                requestCount={100}
                buttonType={router.query.next}
              />
            </WrapItem>
          </Wrap>
          <Pagination hideArrow />
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
