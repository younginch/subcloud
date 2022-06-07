import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  error?: FieldError;
  registeredProps?: UseFormRegisterReturn;
  value?: string;
};

export default function VideoForm({ error, registeredProps, value }: Props) {
  return (
    <FormControl isInvalid={error !== undefined}>
      <Input
        id="url"
        value={value}
        contentEditable={value === undefined}
        placeholder="이곳에 유튜브 링크 입력"
        maxW="35em"
        h="3.2em"
        fontSize="25px"
        borderRadius="5em"
        pl="1em"
        shadow="md"
        {...registeredProps}
      />
      <Box alignItems="center">
        <FormErrorMessage w="fit-content" m="auto" fontSize="15px">
          {error && error.message}
        </FormErrorMessage>
      </Box>
    </FormControl>
  );
}
