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
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { joiResolver } from "@hookform/resolvers/joi";
import { VideoCreateSchema } from "../../utils/schema";
import { Role } from "@prisma/client";
import CreateHeader from "../../components/create/createHeader";
import { PageOptions } from "../../utils/types";
import { AiOutlineSearch } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import SwingProvider from "../../components/swingProvider";
import EventNotice from "../../components/create/eventNotice";

type FormData = {
  url: string;
};

export default function VideoCreate() {
  const bgColor = useColorModeValue("white", "#1F2733");
  const router = useRouter();
  const toast = useToast();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        alignItems="center"
        w="100%"
        h="100vh"
        pt="8em"
        backgroundImage={useColorModeValue(
          "url(https://user-images.githubusercontent.com/17401630/178095314-2e21cba6-7622-4339-8a48-6b4acf20e0bf.svg)",
          "url(https://user-images.githubusercontent.com/17401630/178095101-d5de300f-80be-48db-99f3-795098bf9db0.png)"
        )}
        backgroundSize="cover"
      >
        <Stack alignItems="center" w="100%" m="auto">
          <CreateHeader
            type={router.query.next as "request" | "sub"}
            step={1}
          />
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
                placeholder="이곳에 유튜브 링크 입력"
                _placeholder={{
                  color: useColorModeValue("gray.200", "gray.400"),
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
                color="white"
              />
              <Button
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
                fontSize="20px"
                borderRadius="50%"
                position="absolute"
                minW={{ base: "35px", md: "50px" }}
                h={{ base: "35px", md: "50px" }}
                w={{ base: "35px", md: "50px" }}
                mr="15px"
                zIndex={3}
              >
                <SwingProvider>
                  {router.query.next === "request" ? (
                    <AiOutlineSearch />
                  ) : (
                    <FiUpload />
                  )}
                </SwingProvider>
              </Button>
            </Box>
            <Box alignItems="center" fontSize="20px">
              <FormErrorMessage m="auto" fontSize="15px">
                {errors.url && errors.url.message}
              </FormErrorMessage>
            </Box>
          </FormControl>
          {router.query.next === "sub" && <EventNotice />}
          <UnorderedList
            color="white"
            bg={useColorModeValue(
              "rgba( 205, 205, 255, 0.2 )",
              "rgba( 85, 85, 85, 0.2 )"
            )}
            border={useColorModeValue(
              "2px solid rgba( 255, 255, 255, 0.4 )",
              "2px solid rgba( 105, 105, 105, 0.5 )"
            )}
            className="create-glassmorphism"
            mt="12vh !important"
            p={{ base: "20px 10px 20px 40px", md: "20px 20px 20px 50px" }}
            borderRadius="15px"
            boxShadow="2xl"
            fontSize={{ base: "14px", md: "18px" }}
            spacing="10px"
            maxW="85%"
          >
            <ListItem>클릭 몇 번으로 무료 자막을 요청해 보세요</ListItem>
            <ListItem>
              요청하신 영상에 자막이 생기면 알림으로 알려드려요
            </ListItem>
            <ListItem>
              포인트를 사용하면 자막이 빨리 만들어질 가능성이 높아집니다
            </ListItem>
            <ListItem>
              자막이 만들어지기 전까지 포인트는 사용되지 않습니다
            </ListItem>
          </UnorderedList>
        </Stack>
      </Box>
    </form>
  );
}

VideoCreate.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
