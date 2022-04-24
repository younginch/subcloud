import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { joiResolver } from "@hookform/resolvers/joi";
import { VideoCreateSchema } from "../../utils/schema";
import { Role } from "@prisma/client";

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

  function onSubmit(values: any) {
    return new Promise<void>((resolve, reject) => {
      const { url } = values;
      axios
        .post("/api/video/create", { url })
        .then((res) => {
          resolve(res.data);
          if (router.query.next === "request") {
            router.push(`/video/${res.data.id}/request/create`);
          } else if (router.query.next === "sub") {
            router.push(`/video/${res.data.id}/sub/create`);
          }
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.url !== undefined}>
          <FormLabel htmlFor="url">Video Link</FormLabel>
          <Input
            id="url"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            maxW="540px"
            {...register("url", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          다음
        </Button>
      </form>
    </>
  );
}

VideoCreate.auth = Role.USER;
