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
  Stack,
  useColorModeValue,
  MenuList,
  Menu,
  MenuItem,
  MenuOptionGroup,
  MenuButton,
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
import {
  CheckCircleIcon,
  ChevronDownIcon,
  EditIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { PageOptions, ResVideo } from "../../../../../utils/types";
import { Role } from "@prisma/client";
import SelectLanguage from "../../../../../components/selectLanguage";
import Card from "../../../../../components/user/card/card";
import CardHeader from "../../../../../components/user/card/cardHeader";
import ISO6391, { LanguageCode } from "iso-639-1";
import { AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";

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

  const [video, setVideo] = useState<ResVideo>();
  useEffect(() => {
    axios
      .get<ResVideo>(`/api/user/video`, { params: { serviceId, videoId } })
      .then(({ data }) => {
        setVideo(data);
      });
  }, [serviceId, videoId]);

  const textColor = useColorModeValue("gray.700", "gray.300");
  const codeList: LanguageCode[] = [
    "en",
    "fr",
    "de",
    "it",
    "es",
    "pt",
    "ru",
    "ja",
    "zh",
    "ko",
  ];
  const [uploadToggle] = useMediaQuery("(min-width: 1350px)");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack ms={{ base: "20px", xl: "calc(15vw - 150px)" }} spacing={5}>
        <Card w="850px" mt={5} maxW="calc(100vw - 40px)">
          <CardHeader mb="10px">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
              자막 업로드 영상
            </Text>
          </CardHeader>
          <VideoInfo video={video} />
        </Card>
        <Card w="850px" mt={5} zIndex={2} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <HStack w="full">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                자막 파일 업로드
              </Text>
              <Spacer />
              <Button
                leftIcon={<EditIcon w="14px" h="14px" />}
                colorScheme="teal"
                variant="solid"
              >
                <Text fontSize="14px">Edit on SubCloud</Text>
              </Button>
            </HStack>
          </CardHeader>
          <FormControl isInvalid={errors.file !== undefined}>
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
        </Card>
        <Card w="850px" mt={5} zIndex={2} maxW="calc(100vw - 40px)">
          <CardHeader mb="24px">
            <HStack>
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                자막 언어 선택
              </Text>
              <Tooltip label="자막의 내용과 다른 언어를 선택할시 심사가 거절될 수 있습니다.">
                <Box>
                  <AiOutlineInfoCircle size="20px" />
                </Box>
              </Tooltip>
            </HStack>
          </CardHeader>
          <Menu>
            <FormControl as="fieldset">
              <MenuOptionGroup>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  언어 선택
                </MenuButton>
                <MenuList>
                  {codeList.map((code) => {
                    return (
                      <MenuItem key={code}>
                        {`${ISO6391.getName(code)} (${ISO6391.getNativeName(
                          code
                        )})`}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </MenuOptionGroup>
              <FormErrorMessage>
                {errors.lang && errors.lang.message}
              </FormErrorMessage>
            </FormControl>
          </Menu>
        </Card>
        <Card
          w="400px"
          className={uploadToggle ? "requestFixed" : "requestBottom"}
          zIndex={3}
          maxW="calc(100vw - 40px)"
        >
          <CardHeader mb="24px">
            <Text color={textColor} fontSize="20px" fontWeight="bold" mb="4px">
              업로드 요약
            </Text>
          </CardHeader>
          <Text fontSize="18px">영상 제목</Text>
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
            자막 파일명
          </Text>
          <Text
            fontWeight="bold"
            fontSize="20px"
            overflow="hidden"
            maxW="full"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            널 지워야해 en.kr
          </Text>
          <Text fontSize="18px" mt="20px">
            요청 언어
          </Text>
          <Text fontWeight="bold" fontSize="20px">
            한국어
          </Text>
          <HStack mt="20px !important">
            <Text fontSize="18px">획득 포인트</Text>
            <Tooltip label="포인트는 검토를 통과한 시점에 지급됩니다.">
              <Box>
                <AiOutlineInfoCircle size="20px" />
              </Box>
            </Tooltip>
          </HStack>
          <Text fontWeight="bold" fontSize="20px">
            {100}
          </Text>

          <HStack mt="20px !important">
            <Text fontSize="18px">요청 충족 수</Text>
            <Tooltip label="검토를 통과한 시점에 업데이트됩니다.">
              <Box>
                <AiOutlineInfoCircle size="20px" />
              </Box>
            </Tooltip>
          </HStack>
          <HStack>
            <Text fontWeight="bold" fontSize="20px">
              +{100}
            </Text>
            <AiOutlineUser color={textColor} stroke="2px" />
          </HStack>
          <Button
            colorScheme="blue"
            mt="20px"
            isLoading={isSubmitting}
            type="submit"
          >
            자막 업로드
          </Button>
        </Card>
      </Stack>
      <Wrap>
        <WrapItem paddingX="36px">
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
        </WrapItem>
      </Wrap>
    </form>
  );
}

SubCreate.options = {
  role: Role.User,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
