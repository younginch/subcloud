import {
  Box,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Spacer,
  FormControl,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import router from "next/router";
import { ResRankingSub } from "../../utils/types";
import RankPagination from "./rankPagination";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineSearch } from "react-icons/ai";
import SubRankTableRow from "./subRankTableRow";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  subs: ResRankingSub;
};

type FormData = {
  keyword: string;
};

export default function SubRankTable({ subs }: Props) {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Title", "Language", "Views", "Madeby", "Uploaded"];
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];
  const [pageIndex, gotoPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageCount, setPageCount] = useState<number>(100);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    console.log(values);
    const { keyword } = values;
    console.log(keyword);
  }

  useEffect(() => {
    setPageCount(Math.floor((subs.length + pageSize - 1) / pageSize));
  }, [pageSize, subs]);

  const handleSelectSize = (size: number) => {
    setPageSize(size);
    setPageCount(Math.floor((subs.length + size - 1) / size));
  };

  const handleSelectLang = (lang: string) => {
    if (lang === "All Lang") router.push(`/ranking/video`);
    else router.push(`/ranking/video/${lang}`);
  };

  return (
    <>
      <Box
        pt={10}
        pl={{ base: "10px", lg: "30px", xl: "70px" }}
        pr={{ base: "10px", lg: "30px", xl: "70px" }}
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <HStack>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Lang : All lang
            </MenuButton>
            <MenuList>
              {selectList.map((item) => (
                <MenuItem key={item} onClick={() => handleSelectLang(item)}>
                  Lang : {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Show {pageSize}
            </MenuButton>
            <MenuList>
              {[10, 20, 30, 40, 50].map((item) => (
                <MenuItem key={item} onClick={() => handleSelectSize(item)}>
                  Show {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Spacer />
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
        </HStack>
        <Table variant="simple" color={textColor} mt={5}>
          <Thead>
            <Tr my=".8rem" ps="0px">
              {captions.map((caption, idx) => {
                return (
                  <Th
                    color="gray.400"
                    key={idx}
                    fontWeight="bold"
                    fontSize={{ base: "15px", md: "20px" }}
                  >
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {subs
              .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
              .map((sub) => {
                return (
                  <SubRankTableRow
                    key={sub.id}
                    userId={sub.user.id}
                    videoName={
                      sub.video.youtubeVideo
                        ? sub.video.youtubeVideo.title
                        : "no title"
                    }
                    videoUrl={sub.video.url}
                    platform={sub.serviceId}
                    viewCount={sub.views}
                    userName={sub.user.name ? sub.user.name : "Annonymous"}
                    userImageUrl={sub.user.image ? sub.user.image : ""}
                  />
                );
              })}
          </Tbody>
        </Table>
        <RankPagination
          pageIndex={pageIndex}
          gotoPage={gotoPage}
          pageCount={pageCount}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
}
