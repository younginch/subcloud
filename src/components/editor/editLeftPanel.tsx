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
import useTranslation from "next-translate/useTranslation";
import { EditorContext } from "../../utils/editorCore";
import ToggleTheme from "./toggleTheme";
import { CreateAction, DeleteAllAction } from "../../utils/editorActions";

export default function EditLeftPanel() {
  const { t } = useTranslation("editor");
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
        {t("add_sub")}
      </Button>
      <Button
        rightIcon={<FaSave />}
        onClick={downloadSRT}
        colorScheme="blue"
        w="full"
      >
        {t("save_srt")}
      </Button>
      <Tooltip label="Comming soon!">
        <Button
          rightIcon={<BiHelpCircle />}
          colorScheme="blue"
          isDisabled
          w="full"
        >
          {t("how_use")}
        </Button>
      </Tooltip>
      <Popover placement="right">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button rightIcon={<MdDelete />} colorScheme="red" w="full">
                {t("delete")}
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>{t("confirmation")}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Stack>
                    <Text>{t("confirmation_ex")}</Text>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        execute(new DeleteAllAction());
                        onClose();
                      }}
                    >
                      {t("confirmation_delete")}
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
