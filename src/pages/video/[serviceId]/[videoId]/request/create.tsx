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
  HStack,
  useMediaQuery,
  Checkbox,
  MenuOptionGroup,
  Box,
  keyframes,
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
import { CgShapeTriangle } from "react-icons/cg";
import { TbDiamond, TbDiamonds } from "react-icons/tb";
import { BiRocket } from "react-icons/bi";
import { BsLightningCharge } from "react-icons/bs";
import { HiOutlineFire } from "react-icons/hi";
import useTranslation from "next-translate/useTranslation";

type FormData = {
  serviceId: string;
  videoId: string;
  lang: string;
  point: number;
};

type PointElement = {
  amount: number;
  hoverColor: string;
  icon: React.ReactElement;
};

export default function RequestCreate() {
  const { t } = useTranslation("videoRequest");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const [summaryToggle] = useMediaQuery("(min-width: 1350px)");
  const router = useRouter();
  const serviceId = router.query.serviceId as string;
  const videoId = router.query.videoId as string;
  const toast = useToast();
  const { data } = useSession();
  const [check, setCheck] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: joiResolver(RequestCreateSchema) });
  const points: Array<PointElement> = [
    {
      amount: 10,
      hoverColor: useColorModeValue("#C0F3F8", "#19BFD1"),
      icon: <CgShapeTriangle size="100%" />,
    },
    {
      amount: 50,
      hoverColor: useColorModeValue("green.200", "green.800"),
      icon: <TbDiamonds size="100%" />,
    },
    {
      amount: 100,
      hoverColor: useColorModeValue("blue.200", "blue.800"),
      icon: <TbDiamond size="100%" />,
    },
    {
      amount: 500,
      hoverColor: useColorModeValue("#F4B183", "#B74B09"),
      icon: <HiOutlineFire size="100%" />,
    },
    {
      amount: 1000,
      hoverColor: useColorModeValue("#D8BEEC", "#7330A6"),
      icon: <BiRocket size="100%" />,
    },
    {
      amount: 5000,
      hoverColor: useColorModeValue("#FFE699", "#A29A00"),
      icon: <BsLightningCharge size="100%" strokeWidth="0.2px" />,
    },
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

  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
  `;
  const changeRadius = keyframes`
  0% {
    border-radius: 20%;
  }
  10% {
    border-radius: 45%;
  }
  40% {
    border-radius: 48%;
  }
  100% {
    border-radius: 50%;
  }
  `;

  const getLevel = (point: number) => {
    for (let i = points.length - 1; i >= 0; i--) {
      if (points[i].amount <= point) return i;
    }
    return -1;
  };

  const changeLang = async () => {
    if (watch().lang && !check) {
      setCheck(!check);
      await axios
        .patch("/api/user/lang", {
          requestLang: watch().lang,
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: "Request Lang not changed",
            status: "error",
          });
        });
    }
  };

  function onSubmit(values: FormData) {
    return new Promise<void>((resolve, reject) => {
      axios
        .post("/api/user/request", {
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
      .get<ResVideo>(`/api/user/video`, { params: { serviceId, videoId } })
      .then(({ data }) => {
        setVideo(data);
      });
  }, [serviceId, videoId]);
  useEffect(() => {
    setValue("point", 0);
    axios.get("/api/user/lang").then(({ data }) => {
      setValue("lang", data.requestLangs[0]);
    });
  }, [setValue]);

  const pointBg = useColorModeValue("gray.100", "gray.800");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack ms={{ base: "20px", xl: "calc(15vw - 150px)" }} spacing={5}>
        <Card w="850px" mt={5} maxW="calc(100vw - 40px)">
          <CardHeader mb="10px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              {t("req_vid")}
            </Text>
          </CardHeader>
          <VideoInfo video={video} />
        </Card>
        <Card w="850px" mt={5} zIndex={2} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              {t("select_lang")}
            </Text>
          </CardHeader>
          <Menu>
            <FormControl isInvalid={errors.lang !== undefined} as="fieldset">
              <MenuOptionGroup>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {watch().lang
                    ? ISO6391.getName(watch().lang)
                    : t("select_lang")}
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
              <FormErrorMessage
                w="fit-content"
                justifyContent="center"
                fontSize="14px"
                color="red.300"
              >
                {errors.lang && t("check_subtitle_lang_required")}
              </FormErrorMessage>
            </FormControl>
          </Menu>
          <Checkbox
            mt={5}
            size="lg"
            defaultChecked={check}
            onChange={changeLang}
          >
            {t("basic_lang")}
          </Checkbox>
        </Card>
        <Card w="850px" mt={5} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              {t("point")}
            </Text>
          </CardHeader>
          <Wrap p={5} justify="space-evenly">
            {points.map((element, index) => {
              return (
                <WrapItem key={index} zIndex={10}>
                  <InViewProvider whileHover={1.15} initialScale={0.95}>
                    <Box
                      as={Stack}
                      justifyContent="center"
                      alignItems="center"
                      spacing="-3px"
                      w="80px"
                      h="80px"
                      borderRadius="20%"
                      bg={pointBg}
                      onClick={() =>
                        setValue(
                          "point",
                          Number(element.amount) + Number(watch().point)
                        )
                      }
                      _hover={{
                        bg: element.hoverColor,
                        animation: `1s ${changeRadius}`,
                        borderRadius: "50%",
                      }}
                    >
                      <Box w="40%" h="40%">
                        {element.icon}
                      </Box>
                      <Text fontWeight="bold" fontSize="lg">
                        {element.amount}P
                      </Text>
                    </Box>
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
              {t("point_reset")}
            </Button>
          </HStack>
        </Card>
        <Card
          w="400px"
          className={summaryToggle ? "requestFixed" : "requestBottom"}
          zIndex={3}
          maxW="calc(100vw - 40px)"
        >
          <CardHeader mb="24px">
            <Text color={textColor} fontSize="20px" fontWeight="bold" mb="4px">
              {t("req_summary")}
            </Text>
          </CardHeader>
          <Text fontSize="18px">{t("vid_title")}</Text>
          <Text fontWeight="bold" fontSize="20px">
            {video?.youtubeVideo?.title ?? "unknown"}
          </Text>
          <Text fontSize="18px" mt="20px">
            {t("vid_length")}
          </Text>
          <Text fontWeight="bold" fontSize="20px">
            {video?.youtubeVideo
              ? `${Math.floor(video?.youtubeVideo.duration / 60)}${t("min")} ${
                  video?.youtubeVideo.duration % 60
                }${t("sec")}`
              : "unknown"}
          </Text>
          <Text fontSize="18px" mt="20px">
            {t("req_lang")}
          </Text>
          <Text fontWeight="bold" fontSize="20px">
            {ISO6391.getName(watch().lang)}
          </Text>
          <HStack mt="20px !important">
            <Text fontSize="18px">{t("point")}</Text>
            {getLevel(watch().point) >= 0 && (
              <Box
                as="div"
                w="20px"
                h="20px"
                position="relative"
                _before={{
                  content: "''",
                  position: "relative",
                  display: "block",
                  width: "350%",
                  height: "350%",
                  boxSizing: "border-box",
                  marginLeft: "-125%",
                  marginTop: "-125%",
                  borderRadius: "50%",
                  bgColor: points[getLevel(watch().point)].hoverColor,
                  animation: `3s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.7s infinite`,
                }}
              >
                <Box
                  as="div"
                  w="full"
                  h="full"
                  zIndex="100"
                  mt="-225%"
                  position="absolute"
                >
                  {points[getLevel(watch().point)].icon}
                </Box>
              </Box>
            )}
          </HStack>
          <Text fontWeight="bold" fontSize="20px">
            {watch().point}
          </Text>
          <Button
            colorScheme="blue"
            mt="20px"
            isLoading={isSubmitting}
            type="submit"
          >
            {t("upload_req")}
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
  hideFooter: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
