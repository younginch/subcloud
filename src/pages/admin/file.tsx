import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { useRef } from "react";
import { PageOptions } from "../../utils/types";

function DeleteAllButton() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const onConfirm = () => {
    axios.delete(`/api/admin/file`).then(() => {
      toast({
        title: "Success",
        description: "All files deleted",
        status: "success",
      });
    });
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        모든 S3 버킷 파일 삭제
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete all items in S3
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirm} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default function AdminFile() {
  return (
    <>
      {process.env.NODE_ENV === "development" && <DeleteAllButton />}
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}

AdminFile.options = {
  role: Role.Admin,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
