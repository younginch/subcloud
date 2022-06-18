import { ViewIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Drawer,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Stack,
  useDisclosure,
  FormControl,
  Checkbox,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Role, Withdraw } from "@prisma/client";
import axios from "axios";
import { useRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import useSWR, { KeyedMutator } from "swr";
import { PageOptions } from "../../utils/types";

type ProcessWithdrawButtonProps = {
  withdraw: Withdraw;
  mutate: KeyedMutator<Withdraw[]>;
};

type UpdateWithdrawForm = {
  isCompleted: boolean;
};

function ProcessWithdrawButton({
  withdraw,
  mutate,
}: ProcessWithdrawButtonProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateWithdrawForm>();

  const onSubmit = async (data: UpdateWithdrawForm) => {
    axios
      .post(``)
      .then((res) => {
        mutate();
        onClose();
        toast({
          title: "Withdraw processed",
          description: "Withdraw has been processed successfully",
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
  };

  return (
    <>
      <Button leftIcon={<ViewIcon />} colorScheme="teal" onClick={onOpen}>
        View withdraw
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Process withdraw
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <CopyToClipboard text={withdraw.bankName}>
                  <Button>은행 이름 복사</Button>
                </CopyToClipboard>
                <CopyToClipboard text={withdraw.accountNumber}>
                  <Button>계좌 번호 복사</Button>
                </CopyToClipboard>
                <FormControl isInvalid={errors.isCompleted !== undefined}>
                  <FormLabel htmlFor="isCompleted">Name</FormLabel>
                  <Checkbox {...register("isCompleted")} colorScheme="green" />
                  <FormErrorMessage>
                    {errors.isCompleted && errors.isCompleted.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                취소
              </Button>
              <Button colorScheme="blue" isLoading={isSubmitting}>
                수정
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}

export default function AdminWithdraw() {
  const { data, mutate } = useSWR<Withdraw[]>(`/api/admin/withdraw`);

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>사용자 ID</Th>
            <Th>포인트</Th>
            <Th>은행 이름</Th>
            <Th>계좌 번호</Th>
            <Th>완료 여부</Th>
            <Th>작업</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((withdraw) => {
            return (
              <Tr key={withdraw.id}>
                <Td>{withdraw.userId}</Td>
                <Td>{withdraw.point}</Td>
                <Td>{withdraw.bankName}</Td>
                <Td>{withdraw.accountNumber}</Td>
                <Td>{withdraw.isCompleted}</Td>
                <Td>
                  <ProcessWithdrawButton withdraw={withdraw} mutate={mutate} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

AdminWithdraw.options = { role: Role.Admin, hideTitle: true } as PageOptions;
