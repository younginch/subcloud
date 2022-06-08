import axios from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { PageOptions, ResRankingUser } from "../../../utils/types";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import UserRankTableRow from "../../../components/ranking/userRankTableRow";
import useSWRInfinite from "swr/infinite";

type FormData = {
  keyword: string;
};

export default function UserRankingPage() {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Name", "Total Views", "Total Subs", "Fulfilled", "Rating"];
  const sortBy = "view"; //sub, fulfilledRequests
  const pageSize = 5;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingUser>(url);
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
      `/api/ranking/user/${sortBy}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }`,
    fetcher
  );

  const users = data
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
            {users.map((user) => {
              return (
                <UserRankTableRow
                  key={user.id}
                  userId={user.id}
                  userName={user.name ? user.name : "Annonymous"}
                  userImageUrl={user.image ? user.image : ""}
                  totalViewCount={user._count.views}
                  totalSubCount={user._count.subs}
                  totalFulfilledRequest={user._count.fulfilledRequests}
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

UserRankingPage.options = {
  auth: false,
  hideTitle: true,
  width: "100%",
} as PageOptions;
