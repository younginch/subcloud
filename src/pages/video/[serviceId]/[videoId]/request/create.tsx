import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
  Wrap,
  WrapItem,
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
import CreateHeader from "../../../../../components/create/createHeader";

type FormData = {
  serviceId: string;
  videoId: string;
  lang: string;
  point: number;
};

export default function RequestCreate() {
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

  function onSubmit(values: FormData) {
    return new Promise<void>((resolve, reject) => {
      axios
        .post("/api/request", {
          serviceId,
          videoId,
          lang: values.lang,
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
          reject();
        });
    });
  }

  return (
    <>
      <CreateHeader type="request" step={2} />
      <Wrap>
        <WrapItem>
          <VideoInfo serviceId={serviceId} videoId={videoId} />
        </WrapItem>
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
      </Wrap>
    </>
  );
}

RequestCreate.auth = Role.User;
RequestCreate.hideTitle = true;
