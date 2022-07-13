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
  Box,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ChangeEvent, useContext, useState } from "react";
import { MdTimer } from "react-icons/md";
import { uuid } from "uuidv4";
import { EditorContext } from "../../pages/editor";

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

export default function EditArray() {
  const { contents, setContents } = useContext(EditorContext);
  return (
    <Stack h="100%" maxH="100%" overflowY="scroll" overflowX="hidden" w="full">
      {contents.map((value, index) => {
        return (
          <HStack key={uuid()} position="relative">
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
              <Stack
                alignItems="center"
                w="100%"
                h="100%"
                justifyContent="center"
              >
                <Text>{index + 1}</Text>
              </Stack>
            </Box>
            <Stack w="110px" minW="110px" ml="0px !important" spacing="-8px">
              <HStack justifyContent="space-between">
                <Editable
                  defaultValue={miliToString(value.startTime!)}
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
                  defaultValue={miliToString(value.endTime!)}
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
      })}
    </Stack>
  );
}
