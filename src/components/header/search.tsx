import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Search() {
  const { t } = useTranslation("marginals");
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <form
      style={{ maxWidth: "540px", width: "100%" }}
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
          placeholder={t("placeholder")}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          disabled
        />
      </InputGroup>
    </form>
  );
}
