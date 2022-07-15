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
import useTranslation from "next-translate/useTranslation";

type FormData = {
  url: string;
};

export default function VideoCreate() {
  const { t } = useTranslation("requestSub");
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
          "url(https://user-images.githubusercontent.com/107977965/178267312-053bea1c-0db1-40ee-95b0-e5bdd771a079.jpg)",
          "url(https://user-images.githubusercontent.com/107977965/179161789-14159ea6-7434-41fa-a9c7-80fc1e3d25bf.jpg)"
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
                placeholder={t("search_box")}
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
            <ListItem>{t("explain_box_1")}</ListItem>
            <ListItem>{t("explain_box_2")}</ListItem>
            <ListItem>{t("explain_box_3")}</ListItem>
            <ListItem>{t("explain_box_4")}</ListItem>
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
