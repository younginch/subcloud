import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Layout from "../../../../components/layout";
import FileUpload from "../../../../components/fileUpload";
import { useState } from "react";

export default function SubCreate() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFile = (files: any) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Title</FormLabel>
          <Input
            id="fileId"
            placeholder="name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FileUpload
          accept=".srt"
          label="Subtitle file"
          updateFilesCb={updateUploadedFile}
        />
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
