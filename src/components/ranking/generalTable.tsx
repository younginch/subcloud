import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import ISO6391, { LanguageCode } from "iso-639-1";
import { RankQueryData } from "../../utils/types";
import LanguageCodeList from "../languageCodeList";

type Props = {
  captions: Array<{
    caption: string;
    sortBy?: undefined | string;
  }>;
  lang?: string;
  setLang?: (language: string | undefined) => void;
  sortBy?: { by: string; order: boolean };
  setSortBy?: (sortBy: { by: string; order: boolean }) => void;
  onSubmit?: SubmitHandler<RankQueryData>;
  title?: ReactElement;
  btnComponent?: ReactElement;
  children?: React.ReactNode;
};

export default function GeneralTable({
  captions,
  lang,
  setLang,
  sortBy,
  setSortBy,
  onSubmit,
  title,
  children,
  btnComponent,
}: Props) {
  const { t } = useTranslation("rankings");
  const codeList: LanguageCode[] | undefined = LanguageCodeList();

  const textColor = useColorModeValue("gray.700", "white");

  const { handleSubmit, register } = useForm<RankQueryData>();

  return (
    <>
      {title}
      <HStack>
        {setLang && (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {lang && lang !== "All Lang"
                ? ISO6391.getName(lang)
                : t("all lang")}
            </MenuButton>
            {codeList && (
              <MenuList>
                <MenuItem
                  key={t("all lang")}
                  onClick={() => setLang("All Lang")}
                >
                  {t("all lang")}
                </MenuItem>
                {codeList.map((code) => (
                  <MenuItem key={code} onClick={() => setLang(code)}>
                    {`${ISO6391.getName(code)} (${ISO6391.getNativeName(
                      code
                    )})`}
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </Menu>
        )}
        <Spacer />
        {onSubmit && (
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <HStack>
                  <Input
                    placeholder={t("search")}
                    w="300px"
                    id="keyword"
                    type="keyword"
                    {...register("keyword", {
                      required: "This is required",
                      minLength: {
                        value: 2,
                        message: "Minimum length should be 2",
                      },
                    })}
                    disabled
                  />
                  <Button type="submit" disabled>
                    <AiOutlineSearch />
                  </Button>
                </HStack>
              </FormControl>
            </form>
          </Box>
        )}
      </HStack>
      <Table variant="simple" color={textColor} mt={5}>
        <Thead>
          <Tr my=".8rem" ps="0px">
            {captions.map((data) => (
              <Th
                color="gray.400"
                key={data.caption}
                fontWeight="bold"
                fontSize={{ base: "12px", md: "15px" }}
                onClick={() =>
                  data.sortBy && setSortBy
                    ? data.sortBy === sortBy?.by
                      ? setSortBy({ by: data.sortBy, order: !sortBy?.order })
                      : setSortBy({ by: data.sortBy, order: true })
                    : undefined
                }
              >
                {data.caption}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
      {btnComponent}
    </>
  );
}
