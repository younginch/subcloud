import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <form
      style={{ maxWidth: "540px" }}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search?q=${value}`);
      }}
    >
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          placeholder="검색..."
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </InputGroup>
    </form>
  );
}
