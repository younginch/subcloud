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
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Box,
  HStack,
  useMediaQuery,
  Checkbox,
  MenuOptionGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import SelectLanguage from "../../../../../components/selectLanguage";
import { joiResolver } from "@hookform/resolvers/joi";
import { RequestCreateSchema } from "../../../../../utils/schema";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import VideoInfo from "../../../../../components/create/videoInfo";
import { PageOptions } from "../../../../../utils/types";
import Card from "../../../../../components/user/card/card";
import CardHeader from "../../../../../components/user/card/cardHeader";
import { ChevronDownIcon } from "@chakra-ui/icons";
import InViewProvider from "../../../../../components/inviewProvider";

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
  function onSubmit(values: FormData) {
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

  return (
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
        <VideoInfo serviceId={serviceId} videoId={videoId} />
      </Card>
      <Card w="850px" mt={5} zIndex={2} maxW="calc(100vw - 40px)">
        <CardHeader mb="24px">
          <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
            언어 선택
          </Text>
        </CardHeader>
        <Menu>
          <MenuOptionGroup>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              언어 선택
            </MenuButton>
            <MenuList>
              <MenuItem>한국어</MenuItem>
              <MenuItem>구자라트어</MenuItem>
              <MenuItem>영어</MenuItem>
              <MenuItem>프랑스어</MenuItem>
              <MenuItem>스페인어</MenuItem>
            </MenuList>
          </MenuOptionGroup>
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
                    fontSize="18px"
                  >
                    {value}P
                  </Center>
                </InViewProvider>
              </WrapItem>
            );
          })}
        </Wrap>
        <HStack pt={5}>
          <Slider defaultValue={60} min={0} max={300} step={30}>
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <Input placeholder="Basic usage" />
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
          펜 윅과 명 윅
        </Text>
        <Text fontSize="15px" mt="20px">
          영상 길이
        </Text>
        <Text fontWeight="bold" fontSize="20px">
          22분 20초
        </Text>
        <Text fontSize="15px" mt="20px">
          요청 언어
        </Text>
        <Text fontWeight="bold" fontSize="20px">
          한국어
        </Text>
        <Text fontSize="15px" mt="20px">
          제공 포인트
        </Text>
        <Text fontWeight="bold" fontSize="20px">
          123
        </Text>
        <Button colorScheme="blue" mt="20px">
          요청 올리기
        </Button>
      </Card>
      <WrapItem paddingX="36px">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <FormControl as="fieldset">
            <FormLabel as="legend">요청할 자막 언어</FormLabel>
            <SelectLanguage register={register("lang")} />
            <FormErrorMessage>
              {errors.lang && errors.lang.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.point !== undefined}>
            <FormLabel htmlFor="point">포인트</FormLabel>
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
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            요청
          </Button>
        </form>
      </WrapItem>
    </Stack>
  );
}

RequestCreate.options = {
  role: Role.User,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
