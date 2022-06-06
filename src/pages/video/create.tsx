import { useForm } from "react-hook-form";
import { Button, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { joiResolver } from "@hookform/resolvers/joi";
import { VideoCreateSchema } from "../../utils/schema";
import { Role } from "@prisma/client";
import VideoForm from "../../components/create/videoForm";
import CreateHeader from "../../components/create/createHeader";

type FormData = {
  url: string;
};

export default function VideoCreate() {
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
      <Stack alignItems="center" w="fit-content" m="auto" mt="10em">
        <CreateHeader type={router.query.next as "request" | "sub"} step={1} />
        <VideoForm
          registeredProps={register("url", {
            required: "This is required",
          })}
          error={errors.url}
        />
        <Button
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
          fontSize="20px"
          w="90px"
          h="50px"
          borderRadius="10px"
          marginTop="20px!important"
        >
          다음
        </Button>
      </Stack>
    </form>
  );
}

VideoCreate.options = { auth: Role.User, hideTitle: true };
