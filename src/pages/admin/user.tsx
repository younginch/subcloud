import {
  TableContainer,
  Table,
  Thead,
  Text,
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
  FormErrorMessage,
  Center,
} from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import axios from "axios";
import { useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import useSWR, { KeyedMutator } from "swr";
import { UserUpdateSchema } from "../../utils/schema";
import { PageOptions } from "../../utils/types";

type UpdateButtonProps = {
  user: User;
  mutate: KeyedMutator<User[]>;
};

type UserUpdateForm = {
  role: Role;
  point: number;
};

function UpdateButton({ user, mutate }: UpdateButtonProps) {
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
        .patch(
          "/api/admin/user",
          { role: role as Role, point },
          { params: { id: user.id } }
        )
        .then(() => {
          onClose();
          mutate();
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
                <FormControl isInvalid={errors.role !== undefined}>
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
                  <FormErrorMessage>
                    {errors.role && errors.role.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.point !== undefined}>
                  <FormLabel htmlFor="point">Point</FormLabel>
                  <Input
                    id="point"
                    defaultValue={user.point}
                    type="number"
                    {...register("point")}
                  />
                  <FormErrorMessage>
                    {errors.point && errors.point.message}
                  </FormErrorMessage>
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

export default function AdminUser() {
  const { data, mutate } = useSWR<User[]>("/api/admin/user");

  return (
    <>
      <Center>
        <Text>전체 유저 : {data?.length}명</Text>
      </Center>
      <TableContainer mt="20px">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>이메일</Th>
              <Th>역할</Th>
              <Th>포인트</Th>
              <Th>생성 날짜</Th>
              <Th>변경 날짜</Th>
              <Th>작업</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.point}</Td>
                <Td>{user.createdAt.toString()}</Td>
                <Td>{user.updatedAt?.toString()}</Td>
                <Td>
                  <UpdateButton user={user} mutate={mutate} />
                  <DeleteButton id={user.id} />
                  <CopyToClipboard text={user.id}>
                    <Button>Copy ID</Button>
                  </CopyToClipboard>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

AdminUser.options = { role: Role.Admin, hideTitle: true } as PageOptions;
