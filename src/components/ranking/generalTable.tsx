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
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { RankQueryData } from "../../utils/types";

type Props = {
  captions: Array<string>;
  lang?: string;
  setLang?: (language: string) => void;
  onSubmit?: SubmitHandler<RankQueryData>;
  btnComponent: ReactElement;
  children: React.ReactNode;
};

export default function GeneralTable({
  captions,
  lang,
  setLang,
  onSubmit,
  children,
  btnComponent,
}: Props) {
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];
  const textColor = useColorModeValue("gray.700", "white");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RankQueryData>();

  return (
    <>
      <HStack>
        {lang && setLang && (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Lang : {lang}
            </MenuButton>
            <MenuList>
              {selectList.map((item) => (
                <MenuItem key={item} onClick={() => setLang(item)}>
                  Lang : {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
        <Spacer />
        {onSubmit && (
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <HStack>
                  <Input
                    placeholder="Search..."
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
      </HStack>
      <Table variant="simple" color={textColor} mt={5}>
        <Thead>
          <Tr my=".8rem" ps="0px">
            {captions.map((caption, index) => {
              return (
                <Th
                  color="gray.400"
                  key={index}
                  fontWeight="bold"
                  fontSize={{ base: "12px", md: "15px" }}
                >
                  {caption}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
      {btnComponent}
    </>
  );
}
