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
import SelectLanguage from "../../components/selectLanguage";

export default function VideoCreate() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>((resolve, reject) => {
      const { url, lang } = values;
      axios
        .post("/api/video/create", { url, lang: "ko" })
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
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.url}>
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
        <FormControl as="fieldset">
          <FormLabel as="legend">영상의 언어</FormLabel>
          <SelectLanguage register={register("language")} />
          <FormErrorMessage>
            {errors.lang && errors.lang.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Next
        </Button>
      </form>
    </Layout>
  );
}
