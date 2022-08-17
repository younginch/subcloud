import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  Stack,
  HStack,
  Textarea,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { useState } from "react";
import { PageOptions } from "../../utils/types";

export default function AdminRequest() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userList, setUserList] = useState<string[]>();
  const [videoList, setVideoList] = useState<string[]>();
  const [countList, setCountList] = useState<number[]>([]);
  const [langList, setLangList] = useState<string[]>();

  const excuteRequest = () => {
    console.log(userList, videoList, countList, langList);
  };

  return (
    <Stack w="1000px">
      <Heading>요청할 유저 아이디 리스트</Heading>
      <Textarea
        placeholder="유저들의 정보를 한줄에 하나씩 입력"
        h="200px"
        onChange={(e) => setUserList(e.target.value.split("\n"))}
      />
      <HStack>
        <Stack>
          <Heading fontSize="2xl" w="400px">
            요청받을 영상 링크 입력
          </Heading>
          <Textarea
            placeholder="영상들의 url을 한줄에 하나씩 입력"
            h="200px"
            onChange={(e) => setVideoList(e.target.value.split("\n"))}
          />
        </Stack>
        <Stack>
          <Heading fontSize="2xl" w="400px">
            영상들의 요청받을 회수 입력
          </Heading>
          <Textarea
            placeholder="영상들의 요청될 횟수를 순서 맞춰서 한줄에 하나씩 입력"
            h="200px"
            onChange={(e) =>
              setCountList(e.target.value.split("\n").map((x) => Number(x)))
            }
          />
        </Stack>
        <Stack>
          <Heading fontSize="2xl" w="400px">
            영상들의 요청 언어 입력
          </Heading>
          <Textarea
            placeholder="영상들의 요청 언어를 순서 맞춰서 한줄에 하나씩 입력"
            h="200px"
            onChange={(e) => setLangList(e.target.value.split("\n"))}
          />
        </Stack>
      </HStack>
      <Button
        colorScheme="red"
        w="300px"
        leftIcon={<WarningTwoIcon />}
        onClick={onOpen}
      >
        확인
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>마지막 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>요청을 진행합니다</Text>
              <Text>
                총 {userList?.length}명의 유저들이 {videoList?.length}개의
                영상에 요청을 진행하며, <br />총 요청 횟수는{" "}
                {countList.reduce((sum, currValue) => sum + currValue, 0)}
                회 입니다. <br />
                들어가는 총 포인트는 1000P입니다.
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => excuteRequest()}>
              진행
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

AdminRequest.options = { role: Role.Admin, hideTitle: true } as PageOptions;
