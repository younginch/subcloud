import {
  FormControl,
  FormErrorMessage,
  Button,
  Text,
  Box,
  useToast,
  ListItem,
  ListIcon,
  UnorderedList,
  List,
  Stack,
  useColorModeValue,
  HStack,
  Tooltip,
  useMediaQuery,
  Spacer,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import VideoInfo from "../../../../../components/create/videoInfo";
import { CheckCircleIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";
import { PageOptions, ResVideo } from "../../../../../utils/types";
import { Role } from "@prisma/client";
import Card from "../../../../../components/user/card/card";
import CardHeader from "../../../../../components/user/card/cardHeader";
import ISO6391 from "iso-639-1";
import { AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";
import { YoutubeIcon } from "../../../../../components/icons/customIcons";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import SelectLanguage from "../../../../../components/selectLanguage";
import { joiResolver } from "@hookform/resolvers/joi";
import { UploadCreateSchema } from "../../../../../utils/schema";

type FormData = {
  lang: string;
  file: File;
};

export default function SubCreate() {
  const { t } = useTranslation("uploadSub");
  const router = useRouter();
  const serviceId = router.query.serviceId as string;
  const videoId = router.query.videoId as string;
  const toast = useToast();
  const { data } = useSession();
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: joiResolver(UploadCreateSchema) });
  const [file, setFile] = useState<string | Blob>();

  function onSubmit(values: FormData) {
    return new Promise<void>(async (resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file!);
      try {
        const newFile = await axios.post("/api/user/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const newSub = await axios.post("/api/user/sub", {
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
        router.push(`/user/my/sub`);
      } catch (e: any) {
        reject();
        toast({
          title: "Error",
          description: e.message,
          status: "error",
        });
      }
    });
  }

  const onDrop = useCallback(
    (acceptedFiles: SetStateAction<string | Blob | undefined>[]) => {
      setFile(acceptedFiles[0]);
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5 MB
  });

  const [video, setVideo] = useState<
    ResVideo & {
      _count: {
        requests: number;
        subs: number;
        points: number;
      };
    }
  >();
  useEffect(() => {
    axios
      .get<
        (ResVideo & {
          _count: {
            requests: number;
            subs: number;
            points: number;
          };
        })[]
      >(`/api/public/search/video`, { params: { serviceId, videoId } })
      .then(({ data }) => {
        setVideo(data[0]);
      });
  }, [serviceId, videoId]);

  useEffect(() => {
    setValue("file", file as File);
  }, [file]);

  console.log(file);

  const acceptedFileItems = acceptedFiles.map((file) => (
    <HStack key={file.name} w="100%">
      <CheckCircleIcon color="green" w="20px" h="20px" />
      <Text
        fontSize="17px"
        maxW="calc(100% - 200px)"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {file.name} - {file.size} bytes
      </Text>
      <Spacer />
      <Link href={`https://www.youtube.com/watch?v=${video?.videoId}`} passHref>
        <Button
          leftIcon={<YoutubeIcon size="20px" />}
          colorScheme="red"
          variant="outline"
          minW="130px"
          w="130px"
        >
          {t("preview")}
        </Button>
      </Link>
    </HStack>
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

  const acceptedFileName =
    acceptedFiles.length > 0 ? acceptedFiles[0].name : "";

  const textColor = useColorModeValue("gray.700", "gray.300");

  const [uploadToggle] = useMediaQuery("(min-width: 1350px)");

  console.log("ehif ", errors.file, errors.lang);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        ms={{ base: "20px", xl: "calc(15vw - 150px)" }}
        spacing={5}
        h="fit-content"
        minH="100vh"
      >
        <Card w="850px" mt={5} maxW="calc(100vw - 40px)">
          <CardHeader mb="10px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              {t("upload_vid")}
            </Text>
          </CardHeader>
          <VideoInfo video={video} />
        </Card>
        <Card w="850px" mt={5} zIndex={2} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <HStack w="full" spacing="15px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                {t("upload_sub")}
              </Text>
              <Spacer />
              <Link href={`/editor/?youtubeId=${video?.videoId}`} passHref>
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="teal"
                  variant="solid"
                >
                  {t("edit")}
                </Button>
              </Link>
            </HStack>
          </CardHeader>
          <FormControl>
            <Box
              h="100px"
              borderWidth="1px"
              borderRadius="6px"
              {...getRootProps()}
              bg={useColorModeValue(
                isDragActive ? "blue.100" : "blue.50",
                isDragActive ? "blue.800" : "blue.900"
              )}
              _hover={{
                bg: useColorModeValue("blue.100", "blue.800"),
              }}
              p="15px"
              cursor="pointer"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>{t("file_drop")}</p>
              ) : (
                <p>{t("click_drag")}</p>
              )}
            </Box>
            <HStack mt="15px">{acceptedFileItems}</HStack>
            {errors.file && <Text color="red.400">{t("require_file")}</Text>}
            <FormErrorMessage>
              <List>{fileRejectionItems}</List>
            </FormErrorMessage>
          </FormControl>
        </Card>
        <Card w="850px" mt={5} zIndex={2} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <HStack>
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                {t("select_lang")}
              </Text>
              <Tooltip label={t("select_lang_ex")}>
                <Box>
                  <AiOutlineInfoCircle size="20px" />
                </Box>
              </Tooltip>
            </HStack>
          </CardHeader>
          <SelectLanguage
            lang={watch().lang}
            error={errors.lang}
            setLang={(lang: string) => setValue("lang", lang)}
          />
        </Card>
        <Card
          w="400px"
          className={uploadToggle ? "requestFixed" : "requestBottom"}
          zIndex={3}
          maxW="calc(100vw - 40px)"
        >
          <CardHeader mb="24px">
            <Text color={textColor} fontSize="20px" fontWeight="bold" mb="4px">
              {t("upload_summary")}
            </Text>
          </CardHeader>
          <Text fontSize="18px">{t("vid_title")}</Text>
          <Text
            fontWeight="bold"
            fontSize="20px"
            overflow="hidden"
            maxW="full"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {video?.youtubeVideo?.title ?? "unknown"}
          </Text>
          <Text fontSize="18px" mt="20px">
            {t("sub_file")}
          </Text>
          <Text
            fontWeight="bold"
            fontSize="20px"
            overflow="hidden"
            maxW="full"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {acceptedFileName}
          </Text>
          <Text fontSize="18px" mt="20px">
            {t("sub_lang")}
          </Text>
          <Text fontWeight="bold" fontSize="20px">
            {ISO6391.getName(watch().lang)}
          </Text>
          <HStack mt="20px !important">
            <Text fontSize="18px">{t("point")}</Text>
            <Tooltip label={t("point_ex")}>
              <Box>
                <AiOutlineInfoCircle size="20px" />
              </Box>
            </Tooltip>
          </HStack>
          <Text fontWeight="bold" fontSize="20px">
            {video?._count.points}
          </Text>
          <HStack mt="20px !important">
            <Text fontSize="18px">{t("fulfilled")}</Text>
            <Tooltip label={t("fulfilled_ex")}>
              <Box>
                <AiOutlineInfoCircle size="20px" />
              </Box>
            </Tooltip>
          </HStack>
          <HStack>
            <Text fontWeight="bold" fontSize="20px">
              +{video?._count.requests}
            </Text>
            <AiOutlineUser color={textColor} stroke="2px" />
          </HStack>
          <Button
            colorScheme="blue"
            mt="20px"
            isLoading={isSubmitting}
            type="submit"
          >
            {t("upload_sub")}
          </Button>
        </Card>
      </Stack>
    </form>
  );
}

SubCreate.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
