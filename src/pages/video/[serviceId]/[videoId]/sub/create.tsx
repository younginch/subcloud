import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Text,
  Box,
  useToast,
  Wrap,
  WrapItem,
  ListItem,
  ListIcon,
  UnorderedList,
  List,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import SelectLanguage from "../../../../../components/selectLanguage";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import VideoInfo from "../../../../../components/create/videoInfo";
import CreateHeader from "../../../../../components/create/createHeader";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

type FormData = {
  lang: string;
  file: File;
};

export default function SubCreate() {
  const router = useRouter();
  const serviceId = router.query.serviceId as string;
  const videoId = router.query.videoId as string;
  const toast = useToast();
  const { data } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [file, setFile] = useState<string | Blob>();

  function onSubmit(values: FormData) {
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
        serviceId,
        videoId,
        lang: values.lang,
      });
      resolve();
      toast({
        title: "Subtitles created",
        description: "Subtitles created successfully",
        status: "success",
      });
      router.push(`/user/${data?.user.id}?tab=sub`);
    });
  }

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      onDrop,
      multiple: false,
      maxSize: 5 * 1024 * 1024, // 5 MB
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <ListItem key={file.name}>
      <ListIcon as={CheckCircleIcon} />
      <Text>
        {file.name} - {file.size} bytes
      </Text>
    </ListItem>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <ListItem key={file.name}>
      <ListIcon as={WarningIcon} />
      <Text>
        {file.name} - {file.size} bytes
      </Text>
      <UnorderedList>
        {errors.map((e) => (
          <ListItem key={e.code}>{e.message}</ListItem>
        ))}
      </UnorderedList>
    </ListItem>
  ));

  return (
    <>
      <CreateHeader type="sub" step={2} />
      <Wrap>
        <WrapItem>
          <VideoInfo serviceId={serviceId} videoId={videoId} />
        </WrapItem>
        <WrapItem paddingX="36px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.file !== undefined}>
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
              <List>{acceptedFileItems}</List>
              <FormErrorMessage>
                <List>{fileRejectionItems}</List>
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
        </WrapItem>
      </Wrap>
    </>
  );
}

SubCreate.auth = true;
SubCreate.hideTitle = true;
