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
  Wrap,
  HStack,
  useMediaQuery,
  Checkbox,
  Box,
  keyframes,
  Badge,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import ISO6391 from "iso-639-1";
import { CgShapeTriangle } from "react-icons/cg";
import { TbDiamond, TbDiamonds } from "react-icons/tb";
import { BiRocket } from "react-icons/bi";
import { BsLightningCharge } from "react-icons/bs";
import { HiOutlineFire } from "react-icons/hi";
import useTranslation from "next-translate/useTranslation";
import Joyride, { Step } from "react-joyride";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import InViewProvider from "../../../../../components/inviewProvider";
import CardHeader from "../../../../../components/user/card/cardHeader";
import Card from "../../../../../components/user/card/card";
import {
  PageOptions,
  VideoWithCount,
  ResVideoSearch,
} from "../../../../../utils/types";
import VideoInfo from "../../../../../components/create/videoInfo";
import { RequestCreateSchema } from "../../../../../utils/schema";
import SelectLanguage from "../../../../../components/selectLanguage";
import PointGauge from "../../../../../components/pointGauge";
import { GoalExpr, PointGoal, PointBonus } from "../../../../../utils/etc";
import LanguageCodeList from "../../../../../components/languageCodeList";
import CoupangText, {
  CoupangDynamic,
} from "../../../../../components/advertisements/coupang";

type FormData = {
  serviceId: string;
  videoId: string;
  lang: string;
  fundPoint: number;
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
  const [check, setCheck] = useState(false);
  const langList = LanguageCodeList();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: joiResolver(RequestCreateSchema) });
  const [{ run, steps }, setJoyride] = useState<{
    run: boolean;
    steps: Step[];
  }>({
    run: false,
    steps: [
      {
        content: (
          <h2>
            이 페이지에서 무료로 자막을 요청하고 게이지를 채울 수 있습니다.
          </h2>
        ),
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: "center",
        target: "body",
      },
      {
        target: ".videoInfo",
        content: <h2>자막을 요청하려는 영상이에요</h2>,
      },
      {
        target: ".selectLang-wrapper button.chakra-menu__menu-button",
        content: <h2>자막을 요청할 언어를 골라주세요</h2>,
      },
      {
        target: "div.chakra-wrap",
        content: (
          <h2>
            가입 선물로 200 포인트를 드렸어요. 포인트를 사용하면 게이지를 더
            빨리 채울 수 있어요
          </h2>
        ),
      },
      {
        target: "div.summary",
        content: <h2>요청에 대한 요약이에요. 이벤트 포인트를 확인해보세요</h2>,
        placement: "left",
      },
      {
        target: ".helpButton",
        content: (
          <h2>궁금할땐 언제든지 도움말 버튼을 눌러서 다시 볼 수 있어요</h2>
        ),
      },
    ],
  });
  const session = useSession();
  const [video, setVideo] = useState<VideoWithCount>();
  const [defaultPoint, setDefaultPoint] = useState<number>(0);
  const goalExpr = GoalExpr();
  const { data: isBonus } = useSWR(
    `/api/user/request/bonus?serviceId=${serviceId}&videoId=${videoId}&lang=${
      watch().lang
    }`
  );
  const goalPoint =
    PointGoal(
      video?.youtubeVideo ? video?.youtubeVideo.duration : undefined,
      goalExpr
    ) ?? 1000000;
  const bonusPoint =
    PointBonus(goalPoint, video?._count.requests, isBonus) ?? 0;
  const points: Array<PointElement> = [
    {
      amount: 100,
      hoverColor: useColorModeValue("#C0F3F8", "#19BFD1"),
      icon: <CgShapeTriangle size="100%" />,
    },
    {
      amount: 500,
      hoverColor: useColorModeValue("green.200", "green.800"),
      icon: <TbDiamonds size="100%" />,
    },
    {
      amount: 1000,
      hoverColor: useColorModeValue("blue.200", "blue.800"),
      icon: <TbDiamond size="100%" />,
    },
    {
      amount: 5000,
      hoverColor: useColorModeValue("#F4B183", "#B74B09"),
      icon: <HiOutlineFire size="100%" />,
    },
    {
      amount: 10000,
      hoverColor: useColorModeValue("#D8BEEC", "#7330A6"),
      icon: <BiRocket size="100%" />,
    },
    {
      amount: 50000,
      hoverColor: useColorModeValue("#FFE699", "#A29A00"),
      icon: <BsLightningCharge size="100%" strokeWidth="0.2px" />,
    },
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
    // eslint-disable-next-line no-plusplus
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
        .catch(() => {
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
          requestPoint: defaultPoint + bonusPoint + values.fundPoint,
          fundPoint: values.fundPoint,
        })
        .then(() => {
          toast({
            title: "Success",
            description: "Requested",
            status: "success",
          });
          router.push(`/video/create?next=request`);
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
  useEffect(() => {
    setDefaultPoint(Math.floor(Math.random() * 4) + 7);
  }, []);
  useEffect(() => {
    axios
      .get<ResVideoSearch>(`/api/public/search/video`, {
        params: { serviceId, videoId, lang: watch().lang },
      })
      .then(({ data }) => {
        setVideo(data[0]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, videoId, watch().lang]);
  useEffect(() => {
    setValue("fundPoint", 0);
    axios.get("/api/user/lang").then(async ({ data }) => {
      if (
        router.query.lang &&
        langList &&
        langList.includes(router.query.lang as string)
      )
        setValue("lang", router.query.lang as string);
      else setValue("lang", data.requestLangs[0]);
    });
  }, [langList, router.query.lang, setValue]);

  const pointBg = useColorModeValue("gray.100", "gray.800");
  const errorColor = useColorModeValue("red", "red.300");

  const selectedLang = ISO6391.getName(watch().lang);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        ms={{ base: "20px", xl: "calc(15vw - 150px)" }}
        spacing={5}
        h="fit-content"
        minH="100vh"
      >
        <Joyride
          steps={steps}
          run={run}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
          continuous
          scrollOffset={500}
        />
        <Card w="850px" mt={5} maxW="calc(100vw - 40px)">
          <CardHeader mb="10px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              {t("req_vid")}
            </Text>
          </CardHeader>
          <VideoInfo video={video} />
        </Card>
        <Card w="850px" mt={5} zIndex={2} maxW="calc(100vw - 40px)">
          <Stack
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "start", md: "center" }}
            className="selectLang-wrapper"
          >
            <HStack w="200px" minW="199px" h="fit-content">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                {t("select_lang")}
              </Text>
              <Text fontSize="xl" color={errorColor} ml="4px !important">
                *
              </Text>
            </HStack>
            <Spacer />
            <SelectLanguage
              lang={watch().lang}
              error={errors.lang}
              setLang={(lang: string) => setValue("lang", lang)}
            />
            <Stack
              w="600px"
              maxW="100%"
              alignItems={{ base: "start", md: "end" }}
            >
              <Checkbox size="lg" defaultChecked={check} onChange={changeLang}>
                {t("basic_lang")}
              </Checkbox>
            </Stack>
          </Stack>
        </Card>
        <Card w="850px" mt={5} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <HStack>
              <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
                {t("point")}
              </Text>
              <Spacer />
              <Text color={textColor} fontSize="xl" fontWeight="bold" mb="4px">
                {t("current_point")}
                {`: ${session.data?.user.point}`}
              </Text>
            </HStack>
          </CardHeader>
          <Wrap p={5} justify="space-evenly">
            {points.map((element) => (
              <WrapItem key={element.amount} zIndex={10}>
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
                        "fundPoint",
                        Number(element.amount) + Number(watch().fundPoint)
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
            ))}
          </Wrap>
          {session.data?.user.point &&
            session.data?.user.point < watch().fundPoint && (
              <Text w="100%" textAlign="center" color={errorColor}>
                포인트가 부족합니다.
              </Text>
            )}
          <HStack pt={5}>
            <Text
              minW="110px "
              textAlign="end"
              fontWeight="bold"
              fontSize="18px"
              mr="10px"
            >
              {t("direct")}
            </Text>
            <FormControl isInvalid={errors.fundPoint !== undefined}>
              <Input
                id="point"
                value={router.query.point}
                type="number"
                {...register("fundPoint")}
              />
              <FormErrorMessage>
                {errors.fundPoint && errors.fundPoint.message}
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="blue" onClick={() => setValue("fundPoint", 0)}>
              {t("point_reset")}
            </Button>
          </HStack>
        </Card>
        <Stack alignItems="center" w="850px" maxW="calc(100vw - 40px)">
          <Box w="680px" h="120px" maxW="100%">
            <CoupangDynamic />
          </Box>
          <CoupangText />
        </Stack>
        <Card
          w="400px"
          className={
            summaryToggle ? "summary requestFixed" : "summary requestBottom"
          }
          zIndex={3}
          maxW="calc(100vw - 40px)"
        >
          <CardHeader mb="24px">
            <HStack>
              <Text
                color={textColor}
                fontSize="25px"
                fontWeight="bold"
                mb="4px"
              >
                {t("req_summary")}
              </Text>
              <Button
                variant="ghost"
                onClick={() => {
                  setJoyride({ run: true, steps });
                }}
                className="helpButton"
              >
                <QuestionOutlineIcon />
              </Button>
            </HStack>
          </CardHeader>
          <Text fontSize="20px">{t("vid_title")}</Text>
          <Text fontWeight="bold" fontSize="20px">
            {video?.youtubeVideo?.title ?? "unknown"}
          </Text>
          <Text fontSize="20px" mt="20px">
            {t("vid_length")}
          </Text>
          <Text fontWeight="bold" fontSize="20px">
            {video?.youtubeVideo
              ? `${Math.floor(video!.youtubeVideo.duration / 60)}${t("min")} ${
                  video!.youtubeVideo.duration % 60
                }${t("sec")}`
              : "unknown"}
          </Text>
          <Text fontSize="20px" mt="20px">
            {t("req_lang")}
          </Text>

          <Text
            fontWeight={selectedLang ? "bold" : "normal"}
            color={selectedLang ? "none" : errorColor}
            fontSize={selectedLang ? "20px" : "15px"}
          >
            {selectedLang || t("check_subtitle_lang_required")}
          </Text>
          <HStack mt="20px !important">
            <Text fontSize="20px">{t("point")}</Text>
            {getLevel(watch().fundPoint) >= 0 && (
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
                  bgColor: points[getLevel(watch().fundPoint)].hoverColor,
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
                  {points[getLevel(watch().fundPoint)].icon}
                </Box>
              </Box>
            )}
          </HStack>
          <Text
            fontWeight="bold"
            fontSize="50px"
            ml="5px"
            color={useColorModeValue("blue.400", "blue.200")}
          >
            {defaultPoint + Number(watch().fundPoint) + bonusPoint}
          </Text>
          <HStack mt="5px !important" mb="10px !important">
            <Badge colorScheme="green" fontSize="15px">
              {t("funding")} {watch().fundPoint}
            </Badge>
            <Badge colorScheme="blue" fontSize="15px">
              {t("default")} {defaultPoint}
            </Badge>
            <Badge colorScheme="purple" fontSize="15px">
              {t("bonus")} {bonusPoint}
            </Badge>
          </HStack>
          <PointGauge
            point={video?._count.points ?? 0}
            delta={defaultPoint + Number(watch().fundPoint) + bonusPoint}
            goal={goalPoint}
          />
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
