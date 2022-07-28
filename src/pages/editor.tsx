import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import "react-reflex/styles.css";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SRTFile } from "@younginch/subtitle";
import { useDropzone } from "react-dropzone";
import { GlobalHotKeys } from "react-hotkeys";
import { useRouter } from "next/router";
import { AiOutlineUpload } from "react-icons/ai";
import useTranslation from "next-translate/useTranslation";
import Property from "../components/editor/property";
import EditArray from "../components/editor/editArray";
import NoVideo from "../components/editor/noVideo";
import TimeLineContainer from "../components/editor/timeLineContainer";
import YoutubePlayer from "../components/editor/youtubePlayer";
import { EditorContext, EditorProvider } from "../utils/editorCore";
import Menus from "../components/editor/menus";
import { PageOptions } from "../utils/types";
import EditLeftPanel from "../components/editor/editLeftPanel";
import TopRightPanel from "../components/editor/topRightPanel";

function EditorWithoutContext() {
  const { t } = useTranslation("editor");
  const toast = useToast();
  const {
    setContents,
    setFocusedIndex,
    id,
    setId,
    commandKeys,
    commandHandlers,
    showTimeline,
    showProperty,
  } = useContext(EditorContext);
  const [urlInput, setUrlInput] = useState("");
  const urlField = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.youtubeId) {
      setId(router.query.youtubeId as string);
    }
  }, [router.query.youtubeId, setId]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles[0].text().then((text) => {
        const srtFile = SRTFile.fromText(text);
        setContents(
          srtFile.array.sort((left, right) => left.startTime - right.startTime)
        );
        setFocusedIndex(0);
      });
    },
    [setContents, setFocusedIndex]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const headerBg = useColorModeValue("gray.100", "#181818");
  const headerBodyBg = useColorModeValue("white", "#1f1f1f");
  const splitterColor = useColorModeValue("#cccccc", "black");

  return (
    <GlobalHotKeys keyMap={commandKeys} handlers={commandHandlers} allowChanges>
      <Menus />
      <ReflexContainer
        style={{ width: "100vw", height: "calc(100vh - 30px)" }}
        orientation="horizontal"
      >
        <ReflexElement minSize={100}>
          <ReflexContainer orientation="vertical">
            <ReflexElement minSize={200} maxSize={500}>
              <Stack bg={headerBodyBg} h="100%">
                <Heading
                  fontSize="lg"
                  bg={headerBg}
                  w="100%"
                  borderBottomWidth="1px"
                  p="5px"
                  textAlign="center"
                >
                  {t("upload_sub")}
                </Heading>
                <Stack p="10px" mt="0px !important" spacing="10px">
                  <Box
                    h="150px"
                    borderWidth="1px"
                    borderRadius="6px"
                    {...getRootProps()}
                    bg={useColorModeValue(
                      isDragActive ? "blue.100" : "blue.50",
                      isDragActive ? "#444466" : "#333333"
                    )}
                    _hover={{
                      bg: useColorModeValue("blue.100", "#444466"),
                    }}
                    p="15px"
                    cursor="pointer"
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>{t("file_drop")}</p>
                    ) : (
                      <Stack alignItems="center">
                        <AiOutlineUpload size="50px" />
                        <p>{t("click&drop")}</p>
                      </Stack>
                    )}
                  </Box>
                </Stack>
                <Heading
                  fontSize="lg"
                  bg={headerBg}
                  w="100%"
                  borderBottomWidth="1px"
                  borderTopWidth="1px"
                  p="5px"
                  textAlign="center"
                >
                  {id.length === 0 ? t("select_vid") : t("change_vid")}
                </Heading>
                <form
                  onSubmit={(event: FormEvent) => {
                    event.preventDefault();
                    try {
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      const id = new URL(urlInput).searchParams.get("v");
                      if (!id) {
                        throw new Error("");
                      }
                      setId(id);
                      toast({
                        title: t("complete_vid_title"),
                        description: t("complete_vid_description"),
                        status: "success",
                      });
                    } catch {
                      toast({
                        title: t("error_vid_title"),
                        description: t("error_vid_description"),
                        status: "error",
                      });
                    }
                  }}
                >
                  <Stack p="10px" spacing="10px" alignItems="center">
                    <FormControl>
                      <Input
                        type="url"
                        id="url"
                        value={urlInput}
                        onChange={(event: any) => {
                          setUrlInput(event.target.value);
                        }}
                        placeholder={
                          id.length === 0
                            ? t("insert_url")
                            : t("change_insert_url")
                        }
                        ref={urlField}
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" w="80px">
                      {id.length === 0 ? t("select") : t("change")}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </ReflexElement>
            <ReflexSplitter propagate style={{ borderColor: splitterColor }} />
            <ReflexElement
              minSize={600}
              style={{ overflow: "hidden" }}
              size={1000}
            >
              {id.length === 0 ? (
                <NoVideo urlRef={urlField} />
              ) : (
                <YoutubePlayer id={id} />
              )}
            </ReflexElement>
            <ReflexSplitter propagate style={{ borderColor: splitterColor }} />
            <ReflexElement minSize={300}>
              <TopRightPanel />
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>

        {!showTimeline && <ReflexSplitter propagate />}
        {!showTimeline && (
          <ReflexElement
            minSize={100}
            size={120}
            maxSize={200}
            style={{ overflow: "hidden" }}
          >
            <TimeLineContainer />
          </ReflexElement>
        )}
        <ReflexSplitter
          propagate
          style={{
            height: "2px",
          }}
        />
        <ReflexElement size={400}>
          <ReflexContainer orientation="vertical">
            <ReflexElement>
              <HStack maxH="100%" h="100%" overflowY="hidden">
                <EditLeftPanel />
                <EditArray />
              </HStack>
            </ReflexElement>
            {showProperty && (
              <ReflexSplitter style={{ borderColor: "#aaaaaa" }} />
            )}
            {showProperty && (
              <ReflexElement maxSize={500} minSize={100}>
                <Property />
              </ReflexElement>
            )}
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    </GlobalHotKeys>
  );
}

export default function Editor() {
  function beforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.returnValue = "";
  }

  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  return (
    <EditorProvider>
      <EditorWithoutContext />
    </EditorProvider>
  );
}

Editor.options = {
  auth: false,
  hideTitle: true,
  hideFooter: true,
  hideNavBar: true,
} as PageOptions;
