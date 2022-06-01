import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/adminLayout";

export default function AdminUser() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get(`/api/admin/user`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <AdminLayout>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>이름</Th>
              <Th>이메일</Th>
              <Th>역할</Th>
              <Th>작업</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <UpdateButton user={user} />
                    <DeleteButton id={user.id} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}

type UpdateButtonProps = {
  user: User;
};

function UpdateButton({ user }: UpdateButtonProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState<Role>(user.role);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        수정
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Update account</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="id">ID</FormLabel>
                <Input
                  ref={firstField}
                  id="id"
                  defaultValue={user.id}
                  isDisabled
                />
              </Box>
              <Box>
                <FormLabel>Role</FormLabel>
                <Input id="role" defaultValue={user.id} value={role} hidden />
                <RadioGroup
                  onChange={(value) => {
                    setRole(value as Role);
                  }}
                  value={role}
                >
                  <Stack>
                    <Radio value="ADMIN">Admin</Radio>
                    <Radio value="REVIEWER">Reviewer</Radio>
                    <Radio value="USER">User</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                axios
                  .patch(
                    "/api/admin/user",
                    { role },
                    { params: { id: user.id } }
                  )
                  .then((res) => {
                    onClose();
                    window.location.reload();
                  })
                  .catch((err) => {
                    toast({
                      title: "업데이트 오류",
                      description: err.message,
                      status: "error",
                    });
                  });
              }}
            >
              제출
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

type DeleteButtonProps = {
  id: string;
};

function DeleteButton({ id }: DeleteButtonProps) {
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const {
    isOpen: isDialogOpen,
    onOpen: onDialogOpen,
    onClose: onDialogClose,
  } = useDisclosure();

  return (
    <>
      <Button colorScheme="red" onClick={onDialogOpen}>
        삭제
      </Button>
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete user
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDialogClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  axios
                    .delete(`/api/admin/user`, {
                      params: { id },
                    })
                    .then(() => {
                      onDialogClose();
                      toast({
                        title: "삭제 성공",
                        description:
                          "삭제된 유저는 로그인 페이지에서 삭제됩니다.",
                        status: "success",
                      });
                      window.location.reload();
                    })
                    .catch(() => {
                      onDialogClose();
                      toast({
                        title: "삭제 실패",
                        description: "삭제 실패",
                        status: "error",
                      });
                    });
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

AdminUser.auth = Role.ADMIN;
