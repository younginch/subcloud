import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Stack,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { PageOptions } from "../../utils/types";

export default function Admin() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  async function handleDelete() {
    axios
      .get("/api/admin/delete")
      .then(() => {
        window.location.reload();
        router.push("/");
        toast({
          title: "Success",
          description: "All data has been deleted",
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        });
      })
      .finally(onClose);
  }

  async function handleIndexVideo() {
    axios
      .post("/api/admin/algolia/video")
      .then(() => {
        toast({
          title: "Success",
          description: "All videos have been indexed",
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        });
      });
  }

  async function handleUpdateYoutubeVideo() {
    axios
      .patch("/api/admin/youtube/video")
      .then((res) => {
        toast({
          title: "Success",
          description: `${res.data} videos have been updated`,
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error updating youtube video info",
          description: err.message,
          status: "error",
        });
      });
  }

  async function handleUpdateYoutubeChannel() {
    axios
      .patch("/api/admin/youtube/channel")
      .then((res) => {
        toast({
          title: "Success",
          description: `${res.data} channels have been updated`,
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error updating youtube channel info",
          description: err.message,
          status: "error",
        });
      });
  }

  return (
    <Stack>
      <Button colorScheme="red" onClick={onOpen}>
        전체 DB 삭제
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              전체 DB 삭제
            </AlertDialogHeader>

            <AlertDialogBody>
              작업 시행 후 자동으로 로그아웃됩니다. 새로고침 해주세요.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Button onClick={handleIndexVideo}>전체 비디오 검색 인덱스 재생성</Button>
      <Text>주의: 과도한 갱신은 Youtube API 할당량을 넘을 수 있습니다.</Text>
      <Button onClick={handleUpdateYoutubeVideo}>
        가장 오래된 100개의 Youtube Video 정보 갱신
      </Button>
      <Button onClick={handleUpdateYoutubeChannel}>
        가장 오래된 100개의 Youtube Channel 정보 갱신
      </Button>
    </Stack>
  );
}

Admin.options = {
  role: Role.Admin,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
