import { DeleteIcon } from "@chakra-ui/icons";
import {
  Stack,
  HStack,
  Editable,
  EditablePreview,
  EditableInput,
  Textarea,
  IconButton,
  Text,
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
  Input,
  PopoverFooter,
  Portal,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { MdTimer } from "react-icons/md";
import { EditorContext } from "../../pages/editor";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { SRTContent } from "@younginch/subtitle";

dayjs.extend(duration);

function miliToString(second: number): string {
  return dayjs.duration(second).format("mm:ss,SSS").substring(0, 9);
}

function EditComponent({ index }: { index: number }) {
  const { contents, setContents, setFocusedIndex } = useContext(EditorContext);
  const [value, setValue] = useState<string>(contents[index].toText());

  return (
    <Textarea
      noOfLines={2}
      value={value}
      onFocus={() => {
        setFocusedIndex(index);
      }}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        const newContents = [...contents];
        newContents[index].textArray = event.target.value.split("\n");
        setContents(newContents);
      }}
    />
  );
}

function parseTime(sTime: string): number {
  const m = Number(sTime.substring(0, 2));
  const s = Number(sTime.substring(3, 5));
  const ms = Number(sTime.substring(6, 9));
  return m * 60 * 1000 + s * 1000 + ms;
}

function Timestamp({
  index,
  startOrEnd,
}: {
  index: number;
  startOrEnd: "startTime" | "endTime";
}) {
  const { contents, setContents } = useContext(EditorContext);

  return (
    <HStack justifyContent="space-between">
      <Popover>
        <PopoverTrigger>
          <Button
            maxW="80px"
            onSubmit={(newValue) => {
              const newTime = parseTime("00:00,000");
              if (index > 0 && newTime < contents[index - 1].endTime) {
                return false;
              } else if (
                index < contents.length - 1 &&
                newTime > contents[index + 1].startTime
              ) {
                return false;
              }
              const newContents = [...contents];
              newContents[index][startOrEnd] = parseTime("00:00,000");
              setContents(newContents);
            }}
          >
            {miliToString(contents[index].endTime!)}
          </Button>
        </PopoverTrigger>
        <Portal>
          <Box zIndex={"popover"}>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>{startOrEnd} 조절</PopoverHeader>
              <PopoverBody>
                <HStack>
                  <Button>+1.0초</Button>
                  <Button>+1.5초</Button>
                  <Button>+2.0초</Button>
                  <Button>다음 자막 전까지</Button>
                </HStack>
                <FormControl>
                  <FormLabel>자막 길이 설정</FormLabel>
                  <InputGroup>
                    <Input />
                    <InputRightAddon>초</InputRightAddon>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>자막 종료 시간</FormLabel>
                  <InputGroup>
                    <Input />
                  </InputGroup>
                </FormControl>
              </PopoverBody>
              <PopoverFooter>예상 적정 시간 : 3초</PopoverFooter>
            </PopoverContent>
          </Box>
        </Portal>
      </Popover>
      <MdTimer onClick={() => {}} />
    </HStack>
  );
}

const Row = ({ data, index, style }: ListChildComponentProps<SRTContent[]>) => {
  const { contents, setContents } = useContext(EditorContext);
  return (
    <HStack position="relative" style={style}>
      <Box position="relative" h="100%" w="70px">
        <div
          style={{
            borderStyle: "solid",
            borderColor: "#3197ee transparent transparent transparent",
            borderWidth: "20px 20px 0 0",
            display: "inline-block",
            height: "0px",
            width: "0px",
            position: "absolute",
          }}
        />
        <Stack alignItems="center" w="100%" h="100%" justifyContent="center">
          <Text>{index + 1}</Text>
        </Stack>
      </Box>
      <Stack w="110px" minW="110px" ml="0px !important" spacing="-8px">
        <HStack justifyContent="space-between">
          <Editable
            defaultValue={miliToString(data[index].startTime!)}
            maxW="80px"
            onSubmit={(newValue) => {
              const newContents = [...contents];
              newContents[index].startTime = parseTime(newValue);
              setContents(newContents);
            }}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <MdTimer />
        </HStack>
        <Text pl="30px">~</Text>
        <HStack justifyContent="space-between">
          <Editable
            defaultValue={miliToString(data[index].endTime!)}
            maxW="80px"
            onSubmit={(newValue) => {
              const newTime = parseTime(newValue);
              if (index > 0 && newTime < data[index - 1].endTime) {
                return false;
              } else if (
                index < data.length - 1 &&
                newTime > data[index + 1].startTime
              ) {
                return false;
              }
              const newContents = [...contents];
              newContents[index].endTime = parseTime(newValue);
              setContents(newContents);
            }}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <MdTimer onClick={() => {}} />
        </HStack>
      </Stack>
      <EditComponent index={index} />
      <IconButton
        aria-label="Delete subtitle"
        icon={<DeleteIcon />}
        onClick={() => {
          const newContents = [
            ...contents.slice(0, index),
            ...contents.slice(index + 1),
          ];
          setContents(newContents);
        }}
        colorScheme="red"
      />
    </HStack>
  );
};

export default function EditArray() {
  const { contents } = useContext(EditorContext);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box h="100%" maxH="100%" w="full" ref={ref} ml="0px !important">
      <FixedSizeList
        height={Number(ref.current?.clientHeight)}
        itemData={contents}
        itemCount={contents.length}
        itemKey={(index) =>
          `${index}${contents[index].startTime}${contents[index].endTime}`
        }
        itemSize={90}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </Box>
  );
}
