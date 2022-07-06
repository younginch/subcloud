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
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { SubcloudIcon } from "../components/icons/customIcons";
import { UninstallFormSchema2 } from "../utils/schema";
import { PageOptions } from "../utils/types";
import { FormEvent } from "react";

type FormData = {
  // uninstall reason: entry.554264708
  "entry.554264708": string;
  // user opinion: entry.148823886
  "entry.148823886": string;
};

export default function Uninstall() {
  const toastColor = useColorModeValue("green.300", "green.700");
  const bgColor = useColorModeValue("white", "gray.700");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: joiResolver(UninstallFormSchema2) });

  const clickBtn = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("출력!");
  };
  // url = "https://docs.google.com/forms/u/2/d/e/1FAIpQLSdQLr0LAoNfU-ZDMnxbUbbjdbsNgiViZOwScPHapSVWtS4_vg/formResponse"
  return (
    <form action="https://docs.google.com/forms/u/2/d/e/1FAIpQLSdQLr0LAoNfU-ZDMnxbUbbjdbsNgiViZOwScPHapSVWtS4_vg/formResponse">
      <FormControl isInvalid={errors["entry.554264708"] !== undefined}>
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
              SubCloud가 성공적으로 제거되었습니다
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
            <Heading size="lg">SubCloud를 이용해주셔서 감사합니다</Heading>
            <Text textAlign="center" fontSize="20px" mt="15px !important">
              사용하시는데 불편함이 있었다면
              <br />
              간단히 의견을 남겨주시면 감사하겠습니다
            </Text>
            <Stack w="80%">
              <Text fontSize="19px" fontWeight="bold" mt="30px">
                어떤 점이 불편하셨나요?
              </Text>
              <Select
                icon={<ChevronDownIcon />}
                {...register("entry.554264708")}
              >
                <option>자막이 너무 부족함</option>
                <option>자막 요청이 무시됨</option>
                <option>서비스의 필요성을 느끼지 못함</option>
                <option>편의성이 부족함</option>
                <option>디자인 구림</option>
              </Select>
              <FormErrorMessage m="auto" fontSize="15px">
                {errors["entry.554264708"] && errors["entry.554264708"].message}
              </FormErrorMessage>
              <Text fontSize="19px" fontWeight="bold" mt="50px !important">
                의견을 말씀해주시면 적극 반영하겠습니다
              </Text>
              <Textarea placeholder="메세지" {...register("entry.148823886")} />
              <Center>
                <Button
                  w="200px"
                  h="45px"
                  mt="30px"
                  colorScheme="blue"
                  type="submit"
                  onSubmit={clickBtn}
                >
                  응답 전송
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
  hideFooter: false,
  bgColorLight: "#f7fafc",
} as PageOptions;
