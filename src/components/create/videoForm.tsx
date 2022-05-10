import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
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
      <FormLabel htmlFor="url">Video Link</FormLabel>
      <Input
        id="url"
        value={value}
        contentEditable={value === undefined}
        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        maxW="28em"
        {...registeredProps}
      />
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}
