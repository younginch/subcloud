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
  return dayjs.duration(second).format("HH:mm:ss,SSS").substring(0, 12);
}

function EditComponent({ index }: { index: number }) {
  const { contents, setContents } = useContext(EditorContext);
  const [value, setValue] = useState<string>(contents[index].toText());

  return (
    <Textarea
      noOfLines={2}
      value={value}
      onEnded={(event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        const newContents = [...contents];
        newContents[index].textArray = event.target.value.split("\n");
        setContents(newContents);
      }}
    />
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
            maxW="100px"
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
            maxW="100px"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <MdTimer />
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
    <Box h="100%" maxH="100%" w="full" ref={ref}>
      <FixedSizeList
        height={Number(ref.current?.clientHeight)}
        itemData={contents}
        itemCount={contents.length}
        itemKey={(index) =>
          `${index}${contents[index].startTime}${
            contents[index].endTime
          }${contents[index].toText()}`
        }
        itemSize={90}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </Box>
  );
}
