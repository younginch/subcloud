import axios from "axios";
import { PageOptions, ResRankingSub } from "../../../utils/types";
import { GetServerSideProps } from "next";
import {
  Box,
  Button,
  Center,
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
import { AiOutlineSearch } from "react-icons/ai";
import { useForm } from "react-hook-form";
import SubRankTableRow from "../../../components/ranking/subRankTableRow";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type FormData = {
  keyword: string;
};

export default function SubRankingPage() {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Title", "Language", "Views", "Madeby", "Uploaded"];
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];
  const [lang, setLang] = useState("All Lang");
  const sortBy = "view";
  const pageSize = 5;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingSub>(url);
    return res.data;
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    const { keyword } = values;
    //Todo: search keyword
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/ranking/sub/${sortBy}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }&lang=${lang}`,
    fetcher
  );

  const subs = data
    ? data.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      }, [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isRefreshing = isValidating && data && data.length === size;

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
              {captions.map((caption, index) => {
                return (
                  <Th
                    color="gray.400"
                    key={index}
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
            {subs.map((sub) => {
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
        <Center>
          <Button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            load more
          </Button>
        </Center>
      </Box>
    </>
  );
}

SubRankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
