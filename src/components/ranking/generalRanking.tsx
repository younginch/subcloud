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
import { VscSettings } from "React-icons/vsc";
import { RankQueryData } from "../../utils/types";

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
  return (
    <Stack
      direction={direction as StackDirection}
      alignItems={direction === "row" ? "center" : "flex-start"}
      spacing={direction === "row" ? "15px" : "10px"}
    >
      <Text h="fit-content">언어</Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {lang && lang !== "All Lang" ? ISO6391.getName(lang) : t("all lang")}
        </MenuButton>
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
      </Menu>
    </Stack>
  );
}

function SelectPriority({ direction = "column" }: { direction?: string }) {
  return (
    <Stack
      direction={direction as StackDirection}
      alignItems={direction === "row" ? "center" : "flex-start"}
      spacing={direction === "row" ? "15px" : "10px"}
    >
      <Text>정렬 기준</Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          조회수 (높은 순)
        </MenuButton>
        <MenuList>
          <MenuItem>조회수 (높은 순)</MenuItem>
          <MenuItem>조회수 (낮은 순)</MenuItem>
          <MenuItem>업로드 날짜 (최신 순)</MenuItem>
          <MenuItem>업로드 날짜 (오래된 순)</MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}

type Props = {
  lang?: string;
  setLang?: (language: string | undefined) => void;
  sortBy?: { by: string; order: boolean };
  setSortBy?: (sortBy: { by: string; order: boolean }) => void;
  onSubmit?: SubmitHandler<RankQueryData>;
  children: React.ReactNode;
  btnComponent?: React.ReactNode;
};

export default function GeneralRanking({
  lang,
  setLang,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sortBy,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSortBy,
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
          <Spacer />
          {setLang && (
            <SelectLang lang={lang} setLang={setLang} direction="row" />
          )}
          <SelectPriority direction="row" />
        </HStack>
        {children}
        {btnComponent}
      </Stack>
    );
  }

  return (
    <Stack>
      <Wrap justify="space-between" mb="70px">
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
                    disabled
                  />
                  <Button type="submit" disabled>
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
            <Text fontSize="20px">필터</Text>
            <VscSettings size={20} strokeWidth="inherit" />
          </HStack>
        </WrapItem>
      </Wrap>
      <Collapse in={isOpen} animateOpacity>
        <HStack p="15px">
          {setLang && (
            <>
              <SelectLang lang={lang} setLang={setLang} />
              <Spacer />
            </>
          )}
          <SelectPriority />
          <Spacer />
        </HStack>
      </Collapse>
      {children}
      {btnComponent}
    </Stack>
  );
}
