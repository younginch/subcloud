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
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { MdTimer } from "react-icons/md";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { SRTContent } from "@younginch/subtitle";
import { EditorContext } from "../../utils/editorCore";
import {
  CreateAction,
  DeleteAction,
  EditContentAction,
  EditTimeAction,
} from "../../utils/editorActions";

dayjs.extend(duration);

function miliToString(second: number): string {
  return dayjs.duration(second).format("mm:ss,SSS").substring(0, 9);
}

function EditComponent({ index }: { index: number }) {
  const { contents, setFocusedIndex, execute } = useContext(EditorContext);
  const [value, setValue] = useState<string>(contents[index].toText());

  return (
    <Textarea
      noOfLines={2}
      value={value}
      onFocus={() => {
        setFocusedIndex(index);
      }}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
        execute(new EditContentAction(index, event.target.value.split("\n")));
        setValue(event.target.value);
      }}
      resize="none"
    />
  );
}

type PMButtonProps = {
  index: number;
  onClose: () => void;
  amount: number;
};

function PlusButton({ index, onClose, amount }: PMButtonProps) {
  const { contents, execute } = useContext(EditorContext);

  return (
    <Button
      isDisabled={
        index < contents.length - 1 &&
        contents[index].startTime + amount > contents[index + 1].startTime
      }
      onClick={() => {
        execute(
          new EditTimeAction(index, "end", contents[index].startTime + amount)
        );
        onClose();
      }}
    >
      +{(amount / 1000).toFixed(1)}초
    </Button>
  );
}

function MinusButton({ index, onClose, amount }: PMButtonProps) {
  const { contents, execute } = useContext(EditorContext);

  return (
    <Button
      isDisabled={
        index > 0 &&
        contents[index].endTime - amount < contents[index - 1].endTime
      }
      onClick={() => {
        execute(
          new EditTimeAction(index, "start", contents[index].endTime - amount)
        );
        onClose();
      }}
    >
      -{(amount / 1000).toFixed(1)}초
    </Button>
  );
}

function StartTimestamp({ index }: { index: number }) {
  const { contents, execute } = useContext(EditorContext);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <HStack justifyContent="space-between">
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button maxW="100px" h={8} variant="outline" onClick={onToggle}>
            {miliToString(contents[index].startTime!)}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="400px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>시작 시간 조절</PopoverHeader>
            <PopoverBody>
              <FormControl>
                <FormLabel>자막의 끝부터</FormLabel>
                <HStack>
                  <MinusButton index={index} onClose={onClose} amount={500} />
                  <MinusButton index={index} onClose={onClose} amount={1000} />
                  <MinusButton index={index} onClose={onClose} amount={2000} />
                  <Button
                    onClick={() => {
                      execute(
                        new EditTimeAction(
                          index,
                          "end",
                          contents[index + 1].startTime
                        )
                      );
                      onClose();
                    }}
                    isDisabled={index >= contents.length - 1}
                  >
                    이전 자막 직후
                  </Button>
                </HStack>
                <InputGroup mt={2}>
                  <Input isDisabled />
                  <InputRightAddon>초</InputRightAddon>
                </InputGroup>
              </FormControl>
            </PopoverBody>
            <PopoverFooter>
              <FormControl>
                <FormLabel>자막 시작 시간</FormLabel>
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

function EndTimestamp({ index }: { index: number }) {
  const { contents, execute } = useContext(EditorContext);
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
                <FormLabel>자막 길이 증가</FormLabel>
                <HStack>
                  <PlusButton index={index} onClose={onClose} amount={500} />
                  <PlusButton index={index} onClose={onClose} amount={1000} />
                  <PlusButton index={index} onClose={onClose} amount={2000} />
                  <Button
                    onClick={() => {
                      execute(
                        new EditTimeAction(
                          index,
                          "end",
                          contents[index + 1].startTime
                        )
                      );
                      onClose();
                    }}
                    isDisabled={index >= contents.length - 1}
                  >
                    다음 자막 전까지
                  </Button>
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

function Row({ index, style }: ListChildComponentProps) {
  const { contents, execute, getPlayerTime, duration } =
    useContext(EditorContext);
  let showButton = true;
  if (
    index < contents.length - 1 &&
    contents[index].endTime >= contents[index + 1].startTime
  )
    showButton = false;
  const addButtonBg = useColorModeValue("white", "gray.800");

  return (
    <HStack>
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
                  execute(new EditTimeAction(index, "start", getPlayerTime()));
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
                  execute(new EditTimeAction(index, "end", getPlayerTime()));
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
            execute(new DeleteAction(index));
          }}
          colorScheme="red"
        />
      </HStack>
      {showButton && (
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
            execute(new CreateAction(index + 1, newItem));
          }}
        >
          <Text>Add</Text>
          <Divider orientation="vertical" ml="13px" borderColor={addButtonBg} />
          <SmallAddIcon ml="5px" />
        </Button>
      )}
    </>
  );
}

export default function EditArray() {
  const { contents, setRefArray } = useContext(EditorContext);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<FixedSizeList<any>>(null);

  useEffect(() => {
    setRefArray(listRef);
  }, [listRef, setRefArray]);

  // useEffect(() => {
  //   listRef.current?.forceUpdate();
  // }, [contents.length]);

  return (
    <Box h="100%" maxH="100%" w="full" ref={ref} ml="0px !important">
      <FixedSizeList
        ref={listRef}
        height={Number(ref.current?.clientHeight)}
        itemCount={contents.length}
        itemKey={(index) =>
          `${index}${contents[index].startTime}${contents[index].endTime}`
        }
        itemSize={90}
        width="100%"
        className="editArrayContainer"
      >
        {Row}
      </FixedSizeList>
    </Box>
  );
}
