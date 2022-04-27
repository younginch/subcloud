import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PrismaClient, Role } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Admin() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  async function handleDelete() {
    axios
      .get("/api/admin/delete")
      .then(() => {
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

  return (
    <>
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
    </>
  );
}

Admin.auth = Role.ADMIN;
