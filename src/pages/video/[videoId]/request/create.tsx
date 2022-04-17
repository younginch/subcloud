import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Layout from "../../../../components/layout";
import SelectLanguage from "../../../../components/selectLanguage";

export default function RequestCreate() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>((resolve, reject) => {
      axios
        .post("/api/request/create", {})
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
          <FormLabel htmlFor="url">First name</FormLabel>
          <Input
            id="url"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            {...register("url", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">요청할 자막 언어</FormLabel>
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
          Submit
        </Button>
      </form>
    </Layout>
  );
}
