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
  FormControl,
} from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/adminLayout";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { UserUpdateSchema } from "../../utils/schema";
import { PageOptions } from "../../utils/types";

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
              <Th>이름</Th>
              <Th>이메일</Th>
              <Th>역할</Th>
              <Th>포인트</Th>
              <Th>작업</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.point}</Td>
                  <Td>
                    <UpdateButton user={user} />
                    <DeleteButton id={user.id} />
                    <CopyToClipboard text={user.id}>
                      <Button>Copy ID</Button>
                    </CopyToClipboard>
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

type UserUpdateForm = {
  role: Role;
  point: number;
};

function UpdateButton({ user }: UpdateButtonProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState<Role>(user.role);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserUpdateForm>({ resolver: joiResolver(UserUpdateSchema) });

  function onSubmit(values: UserUpdateForm) {
    return new Promise<void>((resolve, reject) => {
      const { role, point } = values;
      axios
        .patch("/api/admin/user", { role, point }, { params: { id: user.id } })
        .then((res) => {
          onClose();
          window.location.reload();
          resolve();
        })
        .catch((err) => {
          toast({
            title: "업데이트 오류",
            description: err.message,
            status: "error",
          });
          reject(err);
        });
    });
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        수정
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <form>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Update account</DrawerHeader>
            <DrawerBody>
              <Stack spacing="24px">
                <FormControl>
                  <FormLabel htmlFor="id">ID</FormLabel>
                  <Input
                    ref={firstField}
                    id="id"
                    defaultValue={user.id}
                    isDisabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    id="role"
                    defaultValue={user.id}
                    value={role}
                    hidden
                    {...register("role")}
                  />
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
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="point">Point</FormLabel>
                  <Input
                    id="point"
                    defaultValue={user.point}
                    type="number"
                    {...register("point")}
                  />
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                취소
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                제출
              </Button>
            </DrawerFooter>
          </form>
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

AdminUser.options = { auth: Role.Admin } as PageOptions;
