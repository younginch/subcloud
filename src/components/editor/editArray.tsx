import { DeleteIcon } from "@chakra-ui/icons";
import {
  Stack,
  HStack,
  Spacer,
  Editable,
  EditablePreview,
  EditableInput,
  Textarea,
  IconButton,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ChangeEvent, useContext, useState } from "react";
import { MdTimer } from "react-icons/md";
import { EditorContext } from "../../pages/editor";

dayjs.extend(duration);

function miliToString(second: number): string {
  return dayjs.duration(second).format("HH:mm:ss,SSS").substring(0, 12);
}

function EditComponent({ index }: { index: number }) {
  const { contents, setContents } = useContext(EditorContext);
  const [value, setValue] = useState<string>(
    contents[index].content.textArray.reduce(
      (acc, cur) => `${acc}\r\n${cur}`,
      ""
    )
  );

  return (
    <Textarea
      noOfLines={2}
      value={value}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        setContents((prev) => {
          const newContents = [...prev];
          newContents[index].textArray = event.target.value.split("\n");
          return newContents;
        });
      }}
    />
  );
}

export default function EditArray() {
  const { contents, setContents } = useContext(EditorContext);
  return (
    <Stack h="100%" maxH="100%" overflowY="scroll" overflowX="hidden" w="full">
      {contents.map((value, index) => {
        return (
          <HStack key={value.uuid}>
            <Text>{index + 1}</Text>
            <Stack w="200px" minW="200px" ml="15px !important">
              <HStack>
                <Text>시작 시간</Text>
                <Spacer />
                <Editable
                  defaultValue={miliToString(value.content.startTime!)}
                  maxW="100px"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <MdTimer />
              </HStack>
              <HStack>
                <Text>끝 시간</Text>
                <Spacer />
                <Editable
                  defaultValue={miliToString(value.content.endTime!)}
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
                setContents((prevContents: any) => [
                  ...prevContents.slice(0, index),
                  ...prevContents.slice(index + 1),
                ]);
              }}
            />
          </HStack>
        );
      })}
    </Stack>
  );
}
