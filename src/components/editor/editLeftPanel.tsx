import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Tooltip,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { SRTContent, SRTFile } from "@younginch/subtitle";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaSave } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { EditorContext } from "../../utils/editorCore";
import ToggleTheme from "./toggleTheme";
import { CreateAction, DeleteAllAction } from "../../utils/editorActions";

export default function EditLeftPanel() {
  const { contents, execute, duration } = useContext(EditorContext);

  function downloadSRT() {
    const srtFile = new SRTFile();
    srtFile.array = contents;
    const url = window.URL.createObjectURL(new Blob([srtFile.toText()]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `file.srt`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  const headerBg = useColorModeValue("gray.100", "#18161d");

  return (
    <Stack
      h="100%"
      w="180px"
      bg={headerBg}
      p="20px"
      alignItems="center"
      spacing="20px"
    >
      <Button
        rightIcon={<FaPlus />}
        onClick={() => {
          const newItem = new SRTContent(
            contents.length.toString(),
            "00:00:00,000 --> 00:00:00,000",
            []
          );
          if (contents.length === 0) {
            newItem.startTime = 0;
            newItem.endTime = 1000;
          } else {
            newItem.startTime = contents[contents.length - 1].endTime;
            newItem.endTime = Math.min(duration, newItem.startTime + 1000);
          }
          execute(new CreateAction(contents.length, newItem));
        }}
        colorScheme="blue"
        w="full"
      >
        자막 추가
      </Button>
      <Button rightIcon={<FaSave />} onClick={downloadSRT} colorScheme="blue">
        Save to SRT
      </Button>
      <Tooltip label="Comming soon!">
        <Button rightIcon={<BiHelpCircle />} colorScheme="blue" isDisabled>
          How to use
        </Button>
      </Tooltip>
      <Popover placement="right">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button rightIcon={<MdDelete />} colorScheme="red" w="full">
                Delete all
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Stack>
                    <Text>
                      SRT파일로 저장하지 않으면 지금까지의 수정사항을 전부 잃게
                      됩니다.
                    </Text>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        execute(new DeleteAllAction());
                        onClose();
                      }}
                    >
                      자막 전체 삭제
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
      <ToggleTheme />
    </Stack>
  );
}
