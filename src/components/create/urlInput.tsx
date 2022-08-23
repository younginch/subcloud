import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { VideoCreateSchema } from "../../utils/schema";

type FormData = {
  url: string;
};

export default function UrlInput() {
  const { t } = useTranslation("create");
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
          router.push(
            `/video/${res.data.serviceId}/${res.data.videoId}/request/create`
          );
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
      <FormControl
        isInvalid={errors.url !== undefined}
        display="flex"
        flexDir="column"
        pb="15px"
      >
        <HStack spacing={0}>
          <Text fontWeight="bold" fontSize="17px">
            요청할 영상 링크
          </Text>
          <Text color="red.500">*</Text>
        </HStack>
        <Input
          {...register("url", {
            required: "This is required",
          })}
          bg={useColorModeValue("purple.50", "purple.900")}
          borderColor="gray.500"
        />
        <FormErrorMessage m="auto" fontSize="15px">
          {errors.url && t("url_error")}
        </FormErrorMessage>
        <Text>
          영상을 요청하면 개인정보 이용 및 서비스 이용규칙에 동의한 것으로
          간주합니다.
        </Text>
        <Button
          colorScheme="purple"
          isLoading={isSubmitting}
          type="submit"
          mt="10px"
        >
          요청
        </Button>
      </FormControl>
    </form>
  );
}
