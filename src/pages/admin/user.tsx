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
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Order, Request, Role, Sub, SubHistory, User } from "@prisma/client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import useSWR, { KeyedMutator } from "swr";
import { UserUpdateSchema } from "../../utils/schema";
import { PageOptions } from "../../utils/types";

function DetailButton({ id }: { id: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const [subs, setSubs] = useState<Sub[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subHistories, setSubHistories] = useState<SubHistory[]>([]);

  useEffect(() => {
    axios.get(`/api/admin/user?id=${id}`).then((res) => {
      setSubs(res.data.subs);
      setRequests(res.data.requests);
      setOrders(res.data.orders);
      setSubHistories(res.data.subHistories);
    });
  }, [id]);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} size="sm">
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size="70%"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>계정 세부정보</DrawerHeader>

          <DrawerBody>
            <Tabs>
              <TabList>
                <Tab>업로드한 자막</Tab>
                <Tab>요청한 자막</Tab>
                <Tab>주문 내역</Tab>
                <Tab>자막 시청 내역</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Service</Th>
                          <Th>Video ID</Th>
                          <Th>Language</Th>
                          <Th>Status</Th>
                          <Th isNumeric>Views</Th>
                          <Th>Created At</Th>
                          <Th>Updated At</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {subs.map((sub) => (
                          <Tr key={sub.id}>
                            <Td>{sub.serviceId}</Td>
                            <Td>
                              {sub.videoId}
                              <Button
                                onClick={() => {
                                  window.location.href = `https://www.youtube.com/watch?v=${sub.videoId}`;
                                }}
                              >
                                Go
                              </Button>
                            </Td>
                            <Td>{sub.lang}</Td>
                            <Td>{sub.status}</Td>
                            <Td isNumeric>{sub.views}</Td>
                            <Td>{sub.createdAt.toString()}</Td>
                            <Td>{sub.updatedAt.toString()}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Service</Th>
                          <Th>Video ID</Th>
                          <Th>Language</Th>
                          <Th isNumeric>Point</Th>
                          <Th>Created At</Th>
                          <Th>Updated At</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {requests.map((request) => (
                          <Tr key={request.id}>
                            <Td>{request.serviceId}</Td>
                            <Td>
                              {request.videoId}
                              <Button
                                onClick={() => {
                                  window.location.href = `https://www.youtube.com/watch?v=${request.videoId}`;
                                }}
                              >
                                Go
                              </Button>
                            </Td>
                            <Td>{request.lang}</Td>
                            <Td isNumeric>{request.point}</Td>
                            <Td>{request.createdAt.toString()}</Td>
                            <Td>{request.updatedAt?.toString()}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Type</Th>
                          <Th isNumeric>Amount</Th>
                          <Th>Approved at</Th>
                          <Th>Payment key</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {orders.map((order) => (
                          <Tr key={order.id}>
                            <Td>{order.type}</Td>
                            <Td isNumeric>{order.amount}</Td>
                            <Td>{order.approvedAt?.toString()}</Td>
                            <Td>{order.paymentKey}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Sub ID</Th>
                          <Th>viewAt</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {subHistories.map((history) => (
                          <Tr key={history.id}>
                            <Td>{history.subId}</Td>
                            <Td>{history.viewAt.toString()}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Dismiss
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

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

  const {
    handleSubmit,
    register,
    control,
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
      <Button colorScheme="blue" onClick={onOpen} size="sm">
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
                  <Controller
                    name="role"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup onChange={onChange} value={value}>
                        <Stack direction="column">
                          <Radio value={Role.Admin}>Admin</Radio>
                          <Radio value={Role.Reviewer}>Reviewer</Radio>
                          <Radio value={Role.User}>User</Radio>
                          <Radio value={Role.Restricted}>Restricted</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                  />
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
      <Button colorScheme="red" onClick={onDialogOpen} size="sm">
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
      <TableContainer mt="20px" maxHeight="95%" overflowY="auto">
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
                <Td p={0}>
                  <DetailButton id={user.id} />
                  <UpdateButton user={user} mutate={mutate} />
                  <DeleteButton id={user.id} />
                  <CopyToClipboard text={user.id}>
                    <Button size="sm">Copy ID</Button>
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
