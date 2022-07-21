import { useForm } from "react-hook-form";
import { CheckCircleIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Center,
  Heading,
  HStack,
  Spacer,
  Text,
  Button,
  Stack,
  Textarea,
  useColorModeValue,
  Select,
  FormControl,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useTranslation from "next-translate/useTranslation";
import { PageOptions } from "../utils/types";
import { UninstallFormSchema } from "../utils/schema";
import { SubcloudIcon } from "../components/icons/customIcons";

type FormData = {
  // uninstall reason: entry.554264708
  reason: string;
  // user opinion: entry.148823886
  opinion: string;
};

export default function Uninstall() {
  const { t } = useTranslation("uninstall");
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);
  const toastColor = useColorModeValue("green.300", "green.700");
  const bgColor = useColorModeValue("white", "gray.700");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(UninstallFormSchema) });

  function onSubmit(values: FormData) {
    const form = new FormData();
    form.append("날짜", new Date().toString());
    form.append("삭제한 이유", values.reason);
    form.append("의견", values.opinion);

    axios.post(process.env.NEXT_PUBLIC_SHEET_BEST_API as string, form);
    setHasSubmit(true);
  }
  return hasSubmit ? (
    <Stack w="100%" alignItems="center" h="100vh">
      <Stack
        w="580px"
        alignItems="center"
        bg={bgColor}
        borderRadius="25px"
        boxShadow="2xl"
        p="30px 25px 50px 25px"
        mt="100px"
        spacing="20px"
      >
        <Box fill="red.400" w="150px" h="150px">
          <AiFillHeart size="100%" fill="inherit" />
        </Box>
        <Heading size="lg">{t("thanks")}</Heading>
        <Text textAlign="center" fontSize="20px">
          {t("objective")}
        </Text>
      </Stack>
    </Stack>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.reason !== undefined}>
        <Stack w="100%" alignItems="center" h="100vh" spacing="50px">
          <HStack
            w="650px"
            h="65px"
            bg={toastColor}
            pl="25px"
            pr="25px"
            borderRadius="15px"
            mt="50px"
            boxShadow="lg"
          >
            <Text fontSize="19px" color="white" fontWeight="bold">
              {t("successful_uninstall")}
            </Text>
            <Spacer />
            <CheckCircleIcon w="22px" h="22px" color="white" />
          </HStack>
          <Stack
            w="650px"
            alignItems="center"
            bg={bgColor}
            borderRadius="15px"
            boxShadow="2xl"
            p="0px 25px 30px 25px"
          >
            <SubcloudIcon size={150} fill="gray.600" />
            <Heading size="lg">{t("thanks_for_use")}</Heading>
            <Text
              fontSize="20px"
              mt="15px !important"
              pl="45px"
              pr="45px"
              wordBreak="keep-all"
            >
              {t("uninstall_message")}
            </Text>
            <Stack w="80%">
              <Text fontSize="19px" fontWeight="bold" mt="30px">
                {t("question_1")}
              </Text>
              <Select icon={<ChevronDownIcon />} {...register("reason")}>
                <option>{t("question_1")}</option>
                <option>{t("question_2")}</option>
                <option>{t("question_3")}</option>
                <option>{t("question_4")}</option>
                <option>{t("question_5")}</option>
              </Select>
              <FormErrorMessage m="auto" fontSize="15px">
                {errors.reason && errors.reason.message}
              </FormErrorMessage>
              <Text fontSize="19px" fontWeight="bold" mt="50px !important">
                {t("question_2")}
              </Text>
              <Textarea
                placeholder={t("question_2_placeholder")}
                {...register("opinion")}
              />
              <Center>
                <Button
                  w="200px"
                  h="45px"
                  mt="30px"
                  colorScheme="blue"
                  type="submit"
                >
                  {t("send_message")}
                </Button>
              </Center>
            </Stack>
          </Stack>
        </Stack>
      </FormControl>
    </form>
  );
}

Uninstall.options = {
  auth: false,
  hideTitle: true,
  hideNavBar: true,
  hideFooter: true,
  bgColorLight: "#f7fafc",
} as PageOptions;
