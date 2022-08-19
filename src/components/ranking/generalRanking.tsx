import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Collapse,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  Box,
  useDisclosure,
  FormControl,
  Input,
  useMediaQuery,
  StackDirection,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ISO6391, { LanguageCode } from "iso-639-1";
import useTranslation from "next-translate/useTranslation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { RankQueryData } from "../../utils/types";
import LanguageCodeList from "../languageCodeList";

function SelectLang({
  lang,
  setLang,
  direction = "column",
}: {
  lang?: string;
  setLang: (language: string | undefined) => void;
  direction?: string;
}) {
  const { t } = useTranslation("rankings");
  const codeList: LanguageCode[] | undefined = LanguageCodeList();

  return (
    <Stack
      direction={direction as StackDirection}
      alignItems={direction === "row" ? "center" : "flex-start"}
      spacing={direction === "row" ? "15px" : "10px"}
    >
      <Text h="fit-content">{t("language")}</Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {lang && lang !== "All Lang" ? ISO6391.getName(lang) : t("all lang")}
        </MenuButton>
        {codeList && (
          <MenuList>
            <MenuItem key={t("all lang")} onClick={() => setLang("All Lang")}>
              {t("all lang")}
            </MenuItem>
            {codeList.map((code) => (
              <MenuItem key={code} onClick={() => setLang(code)}>
                {`${ISO6391.getName(code)} (${ISO6391.getNativeName(code)})`}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Menu>
    </Stack>
  );
}

type SortOption = {
  name: string;
  sortBy: {
    by: string;
    order: boolean;
  };
};

function SelectPriority({
  sortOptionArray,
  sortOption,
  setSortOption,
  direction = "column",
}: {
  sortOptionArray: SortOption[];
  sortOption: SortOption;
  setSortOption?: (sortOption: SortOption) => void;
  direction?: string;
}) {
  const { t } = useTranslation("rankings");
  return (
    <Stack
      direction={direction as StackDirection}
      alignItems={direction === "row" ? "center" : "flex-start"}
      spacing={direction === "row" ? "15px" : "10px"}
    >
      <Text>{t("generalRanking_standard")}</Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {sortOption.name}
        </MenuButton>
        <MenuList>
          {sortOptionArray.map((option, index) => (
            <MenuItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => setSortOption && setSortOption(option)}
            >
              {option.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Stack>
  );
}

type Props = {
  lang?: string;
  setLang?: (language: string | undefined) => void;
  sortOptionArray: SortOption[];
  sortOption: SortOption;
  setSortOption?: (sortOption: SortOption) => void;
  onSubmit?: SubmitHandler<RankQueryData>;
  children: React.ReactNode;
  btnComponent?: React.ReactNode;
};

export default function GeneralRanking({
  lang,
  setLang,
  sortOptionArray,
  sortOption,
  setSortOption,
  onSubmit,
  children,
  btnComponent,
}: Props) {
  const { t } = useTranslation("rankings");
  const { isOpen, onToggle } = useDisclosure();
  const { handleSubmit, register } = useForm<RankQueryData>();
  const [isPc] = useMediaQuery("(min-width: 950px)");

  if (isPc) {
    return (
      <Stack spacing="80px">
        <HStack spacing="20px">
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
                    />
                    <Button type="submit">
                      <AiOutlineSearch />
                    </Button>
                  </HStack>
                </FormControl>
              </form>
            </Box>
          )}
          <Spacer />
          {setLang && (
            <SelectLang lang={lang} setLang={setLang} direction="row" />
          )}
          <SelectPriority
            sortOptionArray={sortOptionArray}
            sortOption={sortOption}
            setSortOption={setSortOption}
            direction="row"
          />
        </HStack>
        {children}
        {btnComponent}
      </Stack>
    );
  }

  return (
    <Stack>
      <Wrap justify="space-between" mb={{ base: "20px", md: "70px" }}>
        {onSubmit && (
          <WrapItem>
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
                  />
                  <Button type="submit">
                    <AiOutlineSearch />
                  </Button>
                </HStack>
              </FormControl>
            </form>
          </WrapItem>
        )}
        <WrapItem>
          <HStack
            _hover={{ fontWeight: "bold", strokeWidth: ".5px" }}
            sx={{ strokeWidth: ".2px" }}
            cursor="pointer"
            onClick={onToggle}
            ml="5px"
          >
            <Text fontSize="20px">{t("filter")}</Text>
            <VscSettings size={20} strokeWidth="inherit" />
          </HStack>
        </WrapItem>
      </Wrap>
      <Collapse in={isOpen} animateOpacity>
        <HStack p="15px" pt="0px">
          {setLang && (
            <>
              <SelectLang lang={lang} setLang={setLang} />
              <Spacer />
            </>
          )}
          <SelectPriority
            sortOptionArray={sortOptionArray}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <Spacer />
        </HStack>
      </Collapse>
      {children}
      {btnComponent}
    </Stack>
  );
}
