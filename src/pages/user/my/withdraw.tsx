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
import useTranslation from "next-translate/useTranslation";
import { Controller, useForm } from "react-hook-form";
import useSWR, { KeyedMutator } from "swr";
import BankList from "../../../components/user/bankList";
import { PageOptions } from "../../../utils/types";

type CreateWithdrawButtonProps = {
  mutate: KeyedMutator<Withdraw[]>;
};

type CreateWithdrawFormData = {
  point: number;
  bankName: string;
  accountNumber: string;
};

function CreateWithdrawButton({ mutate }: CreateWithdrawButtonProps) {
  const { t } = useTranslation("privateProfile");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateWithdrawFormData>();

  const onSubmit = async ({
    point,
    bankName,
    accountNumber,
  }: CreateWithdrawFormData) => {
    axios
      .post(`/api/user/withdraw`, { point, bankName, accountNumber })
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
    <Stack p={5}>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={onOpen}
        w="150px"
      >
        {t("withdraws_request")}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              {t("withdraws_req_point")}
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing="24px">
                <FormControl isInvalid={errors.point !== undefined}>
                  <FormLabel htmlFor="point">{t("withdraws_point")}</FormLabel>
                  <Input
                    id="point"
                    placeholder={t("withdraws_placeholder")}
                    {...register("point", { required: true })}
                  />
                  <FormErrorMessage>
                    {errors.point && errors.point.message}
                  </FormErrorMessage>
                </FormControl>
                <Text>
                  {t("withedraws_expecatation_dollor")}
                  {t("withedraws_expecatation")}
                  {watch().point * 10} {t("withedraws_expecatation_won")}
                </Text>
                <FormControl isInvalid={errors.bankName !== undefined}>
                  <FormLabel htmlFor="bankName">
                    {t("withedraws_bank")}
                  </FormLabel>
                  <Controller
                    name="bankName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <BankList onChange={onChange} value={value} />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.bankName && errors.bankName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.accountNumber !== undefined}>
                  <FormLabel htmlFor="accountNumber">
                    {t("withedraws_number")}
                  </FormLabel>
                  <Input
                    id="accountNumber"
                    placeholder=""
                    {...register("accountNumber", { required: true })}
                  />
                  <FormErrorMessage>
                    {errors.accountNumber && errors.accountNumber.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                {t("withedraws_button_front")}
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                {t("withedraws_button_end")}
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
}

export default function UserMyWithdraw() {
  const { t } = useTranslation("privateProfile");
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
              <Th>{t("withdraws_amount")}</Th>
              <Th>{t("withdraws_account")}</Th>
              <Th>{t("withdraws_date")}</Th>
              <Th>{t("withdraws_status")}</Th>
              <Th>{t("withdraws_processing")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((withdraw) => (
              <Tr key={withdraw.id}>
                <Td>{withdraw.point}</Td>
                <Td>
                  {withdraw.bankName} {withdraw.accountNumber}
                </Td>
                <Td>{withdraw.createdAt.toString()}</Td>
                <Td>{withdraw.isCompleted}</Td>
                <Td>{withdraw.updatedAt.toString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

UserMyWithdraw.options = {
  auth: true,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
