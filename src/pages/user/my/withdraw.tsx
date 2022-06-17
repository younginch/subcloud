import { AddIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Button,
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
  useDisclosure,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Withdraw } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import useSWR, { KeyedMutator } from "swr";
import { PageOptions } from "../../../utils/types";

type CreateWithdrawButtonProps = {
  mutate: KeyedMutator<Withdraw[]>;
};

type CreateWithdrawFormData = {
  point: number;
};

function CreateWithdrawButton({ mutate }: CreateWithdrawButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateWithdrawFormData>();

  const onSubmit = async ({ point }: CreateWithdrawFormData) => {
    axios
      .post(`/api/withdraw`, { point })
      .then(() => {
        mutate();
        toast({
          title: "출금 요청 완료",
          description: "출금 요청이 완료되었습니다.",
          status: "success",
        });
        onClose();
      })
      .catch((err) => {
        toast({
          title: "출금 요청 실패",
          description: err.message,
          status: "error",
        });
      });
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        새 출금 요청
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              새 포인트 출금 요청
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <FormControl isInvalid={errors.point !== undefined}>
                  <FormLabel htmlFor="point">요청 포인트</FormLabel>
                  <Input
                    id="point"
                    placeholder="Please enter point to withdraw"
                    {...register("point", { required: true })}
                  />
                  <FormErrorMessage>
                    {errors.point && errors.point.message}
                  </FormErrorMessage>
                </FormControl>
                <Text>예상 입금 금액: {watch().point * 10} 원</Text>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                취소
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                요청
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function UserMyWithdraw() {
  const session = useSession();
  const { data, mutate } = useSWR<Withdraw[]>(
    `/api/withdraw?userId=${session.data?.user.id}`
  );

  return (
    <>
      <CreateWithdrawButton mutate={mutate} />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>신청금액 (원)</Th>
              <Th>신청 일시</Th>
              <Th>처리 완료 여부</Th>
              <Th>처리 일시</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((withdraw) => {
              return (
                <Tr key={withdraw.id}>
                  <Td>{withdraw.point}</Td>
                  <Td>{withdraw.createdAt.toString()}</Td>
                  <Td>{withdraw.isCompleted}</Td>
                  <Td>{withdraw.updatedAt.toString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

UserMyWithdraw.options = { auth: true, hideTitle: true } as PageOptions;
