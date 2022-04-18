import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

export default function Search() {
  return (
    <InputGroup maxW="540px">
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
      <Input placeholder="검색..." />
    </InputGroup>
  );
}
