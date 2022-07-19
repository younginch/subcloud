import { DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Stack,
  HStack,
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
  useDisclosure,
  Divider,
  Center,
  useColorMode,
  useColorModeValue,
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

type PMButtonProps = {
  index: number;
  onClose: () => void;
  amount: number;
};

function PlusButton({ index, onClose, amount }: PMButtonProps) {
  const { contents, setContents } = useContext(EditorContext);

  return (
    <Button
      isDisabled={
        index < contents.length - 1 &&
        contents[index].startTime + amount > contents[index + 1].startTime
      }
      onClick={() => {
        const newContents = [...contents];
        newContents[index].endTime = newContents[index].startTime + amount;
        setContents(newContents);
        onClose();
      }}
    >
      +{(amount / 1000).toFixed(1)}초
    </Button>
  );
}

function MinusButton({ index, onClose, amount }: PMButtonProps) {
  const { contents, setContents } = useContext(EditorContext);

  return (
    <Button
      isDisabled={
        index > 0 &&
        contents[index].endTime - amount < contents[index - 1].endTime
      }
      onClick={() => {
        const newContents = [...contents];
        newContents[index].startTime = newContents[index].endTime - amount;
        setContents(newContents);
        onClose();
      }}
    >
      -{(amount / 1000).toFixed(1)}초
    </Button>
  );
}

function StartTimestamp({ index }: { index: number }) {
  const { contents, setContents } = useContext(EditorContext);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <HStack justifyContent="space-between">
      <Button maxW="100px" h={8} variant="outline" onClick={onToggle}>
        {miliToString(contents[index].startTime!)}
      </Button>
    </HStack>
  );
}

function EndTimestamp({ index }: { index: number }) {
  const { contents, setContents } = useContext(EditorContext);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <HStack justifyContent="space-between">
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button maxW="100px" h={8} variant="outline" onClick={onToggle}>
            {miliToString(contents[index].endTime!)}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="400px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>종료 시간 조절</PopoverHeader>
            <PopoverBody>
              <FormControl>
                <FormLabel>시작 시간으로부터</FormLabel>
                <HStack>
                  <PlusButton index={index} onClose={onClose} amount={1000} />
                  <PlusButton index={index} onClose={onClose} amount={1500} />
                  <PlusButton index={index} onClose={onClose} amount={2000} />
                  <Button>다음 자막 전까지</Button>
                </HStack>
                <InputGroup mt={2}>
                  <Input isDisabled />
                  <InputRightAddon>초</InputRightAddon>
                </InputGroup>
              </FormControl>
            </PopoverBody>
            <PopoverFooter>
              <FormControl>
                <FormLabel>자막 종료 시간</FormLabel>
                <InputGroup>
                  <Input isDisabled />
                </InputGroup>
              </FormControl>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </HStack>
  );
}

const Row = ({ data, index, style }: ListChildComponentProps<SRTContent[]>) => {
  const { contents, setContents, getPlayerTime, duration } =
    useContext(EditorContext);

  return (
    <>
      <HStack position="relative" style={style}>
        <Stack alignItems="center" w="70px" h="100%" justifyContent="center">
          <Text>{index + 1}</Text>
        </Stack>
        <Stack w="125px" minW="125px" ml="0px !important" spacing="-5px">
          <HStack justifyContent="space-between">
            <StartTimestamp index={index} />
            <Box w="16px" minW="16px" m="0px !important">
              <MdTimer
                onClick={() => {
                  const newContents = [...contents];
                  newContents[index].startTime = getPlayerTime();
                  setContents(newContents);
                }}
                cursor="pointer"
                size="16px"
              />
            </Box>
          </HStack>
          <Text pl="45px">~</Text>
          <HStack justifyContent="space-between">
            <EndTimestamp index={index} />
            <Box w="16px" minW="16px" m="0px !important">
              <MdTimer
                onClick={() => {
                  const newContents = [...contents];
                  newContents[index].endTime = getPlayerTime();
                  setContents(newContents);
                }}
                cursor="pointer"
              />
            </Box>
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
      <Button
        position="absolute"
        top={`${90 * index + 75}px`}
        left="50%"
        transform="translateX(-50%)"
        h="30px"
        zIndex={2}
        colorScheme="green"
        opacity={0}
        _hover={{
          opacity: 1,
        }}
        pr="5px"
        onClick={() => {
          const newItem = new SRTContent(
            contents.length.toString(),
            "00:00:00,000 --> 00:00:00,000",
            []
          );
          newItem.startTime = contents[index].endTime;
          if (index + 1 < contents.length)
            newItem.endTime = contents[index + 1].startTime;
          else {
            newItem.endTime = Math.min(duration, newItem.startTime + 1000);
          }
          setContents([
            ...contents.slice(0, index + 1),
            newItem,
            ...contents.slice(index + 1),
          ]);
        }}
      >
        <Text>Add</Text>
        <Divider
          orientation="vertical"
          ml="13px"
          borderColor={useColorModeValue("white", "gray.800")}
        />
        <SmallAddIcon ml="5px" />
      </Button>
    </>
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
