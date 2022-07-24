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
import Property from "../components/editor/property";
import EditArray from "../components/editor/editArray";
import NoVideo from "../components/editor/noVideo";
import TimeLineContainer from "../components/editor/timeLineContainer";
import YoutubePlayer from "../components/editor/youtubePlayer";
import Shortcuts from "../components/editor/shortcuts";
import { EditorContext, EditorProvider } from "../utils/editorCore";
import Menus from "../components/editor/menus";
import { PageOptions } from "../utils/types";
import EditLeftPanel from "../components/editor/editLeftPanel";

function EditorWithoutContext() {
  const toast = useToast();
  const {
    setContents,
    setFocusedIndex,
    id,
    setId,
    commandKeys,
    commandHandlers,
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
                  자막 업로드
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
                      <p>파일을 여기에 놓으세요</p>
                    ) : (
                      <Stack alignItems="center">
                        <AiOutlineUpload size="50px" />
                        <p>
                          클릭하거나 드래그 앤 드롭으로 자막을 업로드 하세요
                        </p>
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
                  {id.length === 0 ? "동영상 선택" : "동영상 변경"}
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
                        title: "동영상 변경 완료",
                        description: "동영상이 변경되었습니다",
                        status: "success",
                      });
                    } catch {
                      toast({
                        title: "Error (URL)",
                        description: "Invalid URL",
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
                            ? "동영상 url 입력"
                            : "변경할 url 입력"
                        }
                        ref={urlField}
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" w="80px">
                      {id.length === 0 ? "선택" : "변경"}
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
              <Stack bg={headerBodyBg} h="100%">
                <Heading
                  fontSize="lg"
                  bg={headerBg}
                  w="100%"
                  borderBottomWidth="1px"
                  p="5px"
                  textAlign="center"
                >
                  단축키
                </Heading>
                <Shortcuts />
              </Stack>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexSplitter propagate />
        <ReflexElement
          minSize={100}
          size={120}
          maxSize={200}
          style={{ overflow: "hidden" }}
        >
          <TimeLineContainer />
        </ReflexElement>
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
            <ReflexSplitter style={{ borderColor: "#aaaaaa" }} />
            <ReflexElement maxSize={500} minSize={100}>
              <Property />
            </ReflexElement>
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
