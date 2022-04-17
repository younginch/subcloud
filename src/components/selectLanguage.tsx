import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import ISO6391 from "iso-639-1";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
};

export default function SelectLanguage({ register }: Props) {
  const [language, setLanguage] = useState("");

  return (
    <RadioGroup onChange={setLanguage} value={language}>
      <Stack maxH="540px">
        {ISO6391.getAllCodes().map((code) => {
          return (
            <Radio {...register} key={code} value={code}>
              {`${ISO6391.getName(code)} (${ISO6391.getNativeName(code)})`}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
}
