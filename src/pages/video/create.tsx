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
        .post("/api/video/create", { url, lang })
        .then((res) => {
          resolve(res.data);
          router.push(`/video/${res.data.id}/request/create`);
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
          Next
        </Button>
      </form>
    </Layout>
  );
}
