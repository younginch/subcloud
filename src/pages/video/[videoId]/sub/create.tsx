import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Layout from "../../../../components/layout";
import { useCallback, useState } from "react";
import SelectLanguage from "../../../../components/selectLanguage";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function SubCreate() {
  const router = useRouter();
  const { data, status } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [file, setFile] = useState<string | Blob>();

  function onSubmit(values: any) {
    return new Promise<void>(async (resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file!);
      const newFile = await axios.post("/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newSub = await axios.post("/api/sub", {
        fileId: newFile.data.id,
        videoId: router.query.videoId,
        lang: values.lang,
      });
      resolve();
    });
  }

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5 MB
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.file}>
          <FormLabel htmlFor="name">자막 파일</FormLabel>
          <Box w="360px" h="120px" borderWidth="1px" borderRadius="6px">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Text>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </Text>
            </div>
          </Box>
          <FormErrorMessage>
            {errors.file && errors.file.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">자막 언어</FormLabel>
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
          업로드
        </Button>
      </form>
    </>
  );
}

SubCreate.auth = true;
