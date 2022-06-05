import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import ISO6391, { LanguageCode } from "iso-639-1";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
};

export default function SelectLanguage({ register }: Props) {
  const [language, setLanguage] = useState("");

  const codeList: LanguageCode[] = [
    "en",
    "fr",
    "de",
    "it",
    "es",
    "pt",
    "ru",
    "ja",
    "zh",
    "ko",
  ];

  return (
    <RadioGroup onChange={setLanguage} value={language}>
      <Stack>
        {codeList.map((code) => {
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
