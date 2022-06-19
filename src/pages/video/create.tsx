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
        .post("/api/video", { url })
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
      <Box alignItems="center" w="100%" h="100vh" pt="12em">
        <Stack alignItems="center" w="100%" m="auto" backdropFilter="blur(5px)">
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
                placeholder="이곳에 유튜브 링크 입력"
                w={{
                  base: "90vw",
                  sm: "85vw",
                  md: "80vw",
                  lg: "60vw",
                  xl: "50vw",
                }}
                maxW="800px"
                h="3.2em"
                fontSize="25px"
                borderRadius="5em"
                pl="1em"
                shadow="md"
                {...register("url", {
                  required: "This is required",
                })}
                textAlign="center"
                bg={bgColor}
              />
              <Button
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
                fontSize="20px"
                borderRadius="50%"
                position="absolute"
                w="50px"
                h="50px"
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
            <Box alignItems="center">
              <FormErrorMessage m="auto" fontSize="15px">
                {errors.url && errors.url.message}
              </FormErrorMessage>
            </Box>
          </FormControl>
          <UnorderedList>
            <ListItem mt="12vh">Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </UnorderedList>
        </Stack>
      </Box>
    </form>
  );
}

VideoCreate.options = {
  role: Role.User,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
