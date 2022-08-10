import {
  Button,
  FormControl,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Portal,
} from "@chakra-ui/react";
import ISO6391, { LanguageCode } from "iso-639-1";
import type { FieldError } from "react-hook-form";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useTranslation from "next-translate/useTranslation";
import LanguageCodeList from "./languageCodeList";

type Props = {
  lang: string;
  error: FieldError | undefined;
  setLang: (lang: string) => void;
};

export default function SelectLanguage({ lang, error, setLang }: Props) {
  const { t } = useTranslation("videoRequest");
  const codeList: LanguageCode[] | undefined = LanguageCodeList();

  return (
    <Menu>
      <FormControl isInvalid={error !== undefined} as="fieldset">
        <MenuOptionGroup>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {lang ? ISO6391.getName(lang) : t("select_lang")}
          </MenuButton>
          <Portal>
            {codeList && (
              <MenuList>
                {codeList.map((code) => (
                  <MenuItem key={code} onClick={() => setLang(code)}>
                    {`${ISO6391.getName(code)} (${ISO6391.getNativeName(
                      code
                    )})`}
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </Portal>
        </MenuOptionGroup>
        <FormErrorMessage
          w="fit-content"
          justifyContent="center"
          fontSize="14px"
          color="red.300"
        >
          {error && t("check_subtitle_lang_required")}
        </FormErrorMessage>
      </FormControl>
    </Menu>
  );
}
