import { FormControl, Input, FormErrorMessage, Box } from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  error?: FieldError;
  registeredProps?: UseFormRegisterReturn;
  value?: string;
};

export default function VideoForm({ error, registeredProps, value }: Props) {
  return (
    <FormControl
      isInvalid={error !== undefined}
      justifyContent="center"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Input
        id="url"
        value={value}
        contentEditable={value === undefined}
        placeholder="이곳에 유튜브 링크 입력"
        w={{ base: "90vw", sm: "80vw", md: "60vw", lg: "50vw", xl: "40vw" }}
        h="3.2em"
        fontSize="25px"
        borderRadius="5em"
        pl="1em"
        shadow="md"
        {...registeredProps}
        textAlign="center"
      />
      <Box alignItems="center">
        <FormErrorMessage m="auto" fontSize="15px">
          {error && error.message}
        </FormErrorMessage>
      </Box>
    </FormControl>
  );
}
