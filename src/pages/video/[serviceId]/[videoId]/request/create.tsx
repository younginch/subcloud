import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
  WrapItem,
  Stack,
  Text,
  useColorModeValue,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Wrap,
  Center,
  HStack,
  useMediaQuery,
  Checkbox,
  MenuOptionGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { RequestCreateSchema } from "../../../../../utils/schema";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import VideoInfo from "../../../../../components/create/videoInfo";
import { PageOptions, ResVideo } from "../../../../../utils/types";
import Card from "../../../../../components/user/card/card";
import CardHeader from "../../../../../components/user/card/cardHeader";
import { ChevronDownIcon } from "@chakra-ui/icons";
import InViewProvider from "../../../../../components/inviewProvider";
import { useEffect, useState } from "react";
import ISO6391, { LanguageCode } from "iso-639-1";

type FormData = {
  serviceId: string;
  videoId: string;
  lang: string;
  point: number;
};

export default function RequestCreate() {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const [summaryToggle] = useMediaQuery("(min-width: 1450px)");
  const [videoInfoToggle] = useMediaQuery("(min-width: 900px)");
  const router = useRouter();
  const serviceId = router.query.serviceId as string;
  const videoId = router.query.videoId as string;
  const toast = useToast();
  const { data } = useSession();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: joiResolver(RequestCreateSchema) });
  const pointArray = [10, 50, 100, 500, 1000, 5000];
  const pointArrayColor = [
    "red.200",
    "green.200",
    "tomato",
    "blue.200",
    "gray.200",
    "yellow",
  ];
  const codeList: LanguageCode[] = [
    "en",
    "fr",
    "de",
    "it",
    "es",
    "pt",
    "ru",
    "ja",
    "zh",
    "ko",
  ];
  function onSubmit(values: FormData) {
    console.log("fuck");
    return new Promise<void>((resolve, reject) => {
      axios
        .post("/api/request", {
          serviceId,
          videoId,
          lang: values.lang,
          point: values.point,
        })
        .then((res) => {
          toast({
            title: "Success",
            description: "Request created",
            status: "success",
          });
          router.push(`/user/${data?.user.id}?tab=requests`);
          resolve();
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err.response.data.message,
            status: "error",
          });
          reject(err);
        });
    });
  }
  const [video, setVideo] = useState<ResVideo>();
  useEffect(() => {
    axios
      .get<ResVideo>(`/api/video`, { params: { serviceId, videoId } })
      .then(({ data }) => {
        setVideo(data);
      });
  }, [serviceId, videoId]);
  useEffect(() => {
    setValue("point", 0);
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack ms={{ base: "20px", xl: "calc(15vw - 150px)" }} spacing={5}>
        <Card
          w={videoInfoToggle ? "fit-content" : "calc(100vw - 40px)"}
          mt={5}
          maxW="calc(100vw - 40px)"
        >
          <CardHeader mb="10px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              요청 영상
            </Text>
          </CardHeader>
          <VideoInfo video={video} />
        </Card>
        <Card w="850px" mt={5} zIndex={2} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              언어 선택
            </Text>
          </CardHeader>
          <Menu>
            <FormControl as="fieldset">
              <MenuOptionGroup>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {watch().lang ? ISO6391.getName(watch().lang) : "언어 선택"}
                </MenuButton>
                <MenuList>
                  {codeList.map((code) => {
                    return (
                      <MenuItem
                        key={code}
                        onClick={() => setValue("lang", code)}
                      >
                        {`${ISO6391.getName(code)} (${ISO6391.getNativeName(
                          code
                        )})`}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </MenuOptionGroup>
              <FormErrorMessage>
                {errors.lang && errors.lang.message}
              </FormErrorMessage>
            </FormControl>
          </Menu>
          <Checkbox mt={5} size="lg" defaultChecked>
            기본 요청 언어로 저장
          </Checkbox>
        </Card>
        <Card w="850px" mt={5} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              포인트
            </Text>
          </CardHeader>
          <Wrap>
            {pointArray.map((value, index) => {
              return (
                <WrapItem key={index}>
                  <InViewProvider whileHover={1.05} initialScale={0.95}>
                    <Center
                      w="80px"
                      h="80px"
                      borderRadius="20%"
                      bg={pointArrayColor[index]}
                      onClick={() =>
                        setValue("point", Number(value) + Number(watch().point))
                      }
                    >
                      {value}P
                    </Center>
                  </InViewProvider>
                </WrapItem>
              );
            })}
          </Wrap>
          <HStack pt={5}>
            <FormControl isInvalid={errors.point !== undefined}>
              <Input
                id="point"
                value={router.query.point}
                type="number"
                {...register("point")}
              />
              <FormErrorMessage>
                {errors.point && errors.point.message}
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="blue" onClick={() => setValue("point", 0)}>
              리셋
            </Button>
          </HStack>
        </Card>
        <Card
          w="500px"
          className={summaryToggle ? "requestFixed" : "requestBottom"}
          zIndex={3}
          maxW="calc(100vw - 40px)"
        >
          <CardHeader mb="24px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              요청 요약
            </Text>
          </CardHeader>
          <Text fontSize="15px">영상 제목</Text>
          <Text fontWeight="bold" fontSize="20px">
            {video?.youtubeVideo?.title ?? "unknown"}
          </Text>
          <Text fontSize="15px" mt="20px">
            영상 길이
          </Text>
          <Text fontWeight="bold" fontSize="20px">
            {video?.youtubeVideo
              ? `${Math.floor(video?.youtubeVideo.duration / 60)}분 ${
                  video?.youtubeVideo.duration % 60
                }초`
              : "unknown"}
          </Text>
          <Text fontSize="15px" mt="20px">
            요청 언어
          </Text>
          <Text fontWeight="bold" fontSize="20px">
            {ISO6391.getName(watch().lang)}
          </Text>
          <Text fontSize="15px" mt="20px">
            제공 포인트
          </Text>
          <Text fontWeight="bold" fontSize="20px">
            {watch().point}
          </Text>
          <Button
            colorScheme="blue"
            mt="20px"
            isLoading={isSubmitting}
            type="submit"
          >
            요청 올리기
          </Button>
        </Card>
      </Stack>
      <FormControl isInvalid={errors.serviceId !== undefined} hidden>
        <FormLabel htmlFor="serviceId">서비스</FormLabel>
        <Input
          id="serviceId"
          value={router.query.serviceId}
          {...register("serviceId")}
        />
        <FormErrorMessage>
          {errors.serviceId && errors.serviceId.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.videoId !== undefined} hidden>
        <FormLabel htmlFor="videoId">영상 ID</FormLabel>
        <Input
          id="videoId"
          value={router.query.videoId}
          {...register("videoId")}
        />
        <FormErrorMessage>
          {errors.videoId && errors.videoId.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}

RequestCreate.options = {
  role: Role.User,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
