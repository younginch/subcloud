import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Text,
  FormControl,
  HStack,
  Input,
  Stack,
  useDisclosure,
  useMediaQuery,
  Wrap,
  WrapItem,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Collapse,
  StackDirection,
  Spacer,
  useColorModeValue,
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
  direction = "row",
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
}: {
  sortOptionArray: SortOption[];
  sortOption: SortOption;
  setSortOption?: (sortOption: SortOption) => void;
}) {
  const buttonActiveBg = useColorModeValue("purple.400", "purple.600");
  return (
    <Wrap>
      {sortOptionArray.map((option) => (
        <WrapItem key={option.name}>
          <Button
            bg={
              option.name === sortOption.name ? buttonActiveBg : "transparent"
            }
            color={option.name === sortOption.name ? "white" : ""}
            _hover={{ bg: buttonActiveBg, color: "white" }}
            size={{ base: "xs", sm: "sm" }}
            onClick={() => setSortOption && setSortOption(option)}
          >
            {option.name}
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  );
}

type Props = {
  lang?: string;
  setLang?: (language: string | undefined) => void;
  sortOptionArray: SortOption[];
  sortOption: SortOption;
  setSortOption?: (sortOption: SortOption) => void;
  onSubmit?: SubmitHandler<RankQueryData>;
};

export default function RankingController({
  lang,
  setLang,
  sortOptionArray,
  sortOption,
  setSortOption,
  onSubmit,
}: Props) {
  const { t } = useTranslation("rankings");
  const { isOpen, onToggle } = useDisclosure();
  const { handleSubmit, register } = useForm<RankQueryData>();
  const [isPc] = useMediaQuery("(min-width: 620px)");
  const hasFilter = setLang;

  if (isPc || !hasFilter) {
    return (
      <Stack spacing="30px">
        <SelectPriority
          sortOptionArray={sortOptionArray}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <HStack spacing="20px">
          {onSubmit && (
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <HStack>
                    <Input
                      placeholder={t("search")}
                      w="300px"
                      maxW="full"
                      id="keyword"
                      type="keyword"
                      {...register("keyword", {
                        required: "This is required",
                        minLength: {
                          value: 2,
                          message: "Minimum length should be 2",
                        },
                      })}
                      className="videoSearch"
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
          {setLang && <SelectLang lang={lang} setLang={setLang} />}
        </HStack>
      </Stack>
    );
  }

  return (
    <Stack maxW="100%">
      <SelectPriority
        sortOptionArray={sortOptionArray}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <Wrap justify="space-between" mb={{ base: "20px", md: "70px" }}>
        {onSubmit && (
          <WrapItem>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <HStack maxW="calc(100vw - 60px)">
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
        {setLang && <SelectLang lang={lang} setLang={setLang} />}
      </Collapse>
    </Stack>
  );
}
