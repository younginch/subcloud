import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Layout from "../../../../components/layout";
import SelectLanguage from "../../../../components/selectLanguage";

export default function RequestCreate() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>((resolve, reject) => {
      axios
        .post("/api/request", {
          videoId: router.query.videoId,
          lang: values.lang,
        })
        .then((res) => {
          resolve();
        })
        .catch((err) => {
          reject();
        });
    });
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.url}>
          <FormLabel htmlFor="url">영상 URL</FormLabel>
          <Input id="url" value={router.query.videoId} {...register("url")} />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">요청할 자막 언어</FormLabel>
          <SelectLanguage register={register("lang")} />
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
          요청
        </Button>
      </form>
    </Layout>
  );
}
