import { useForm } from "react-hook-form";
import {
  Button,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { joiResolver } from "@hookform/resolvers/joi";
import { VideoCreateSchema } from "../../utils/schema";
import { Role } from "@prisma/client";
import { ChevronRightIcon } from "@chakra-ui/icons";
import VideoForm from "../../components/create/videoForm";
import CreateHeader from "../../components/create/createHeader";

type FormData = {
  url: string;
};

export default function VideoCreate() {
  const router = useRouter();
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
          reject(err.response.data);
        });
    });
  }

  return (
    <Stack>
      <CreateHeader type={router.query.next as "request" | "sub"} step={1} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VideoForm
          registeredProps={register("url", {
            required: "This is required",
          })}
          error={errors.url}
        />
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          다음
        </Button>
      </form>
    </Stack>
  );
}

VideoCreate.auth = Role.USER;
VideoCreate.hideTitle = true;
