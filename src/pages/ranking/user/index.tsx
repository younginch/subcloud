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
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import router from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import UserRankTableRow from "../../../components/ranking/userRankTableRow";

type UserRankingPageProps = {
  users: ResRankingUser;
};

type FormData = {
  keyword: string;
};

export default function UserRankingPage({ users }: UserRankingPageProps) {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Name", "Total Views", "Total Subs", "Fulfilled", "Rating"];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    const { keyword } = values;
    //Todo: search keyword
  }

  const userRanking = () => {
    return users.map((user) => {
      return (
        <p key={user.id}>
          name: {user.name}, email: {user.email}, image: {user.image}, subs:{" "}
          {user._count.subs}, views: {user._count.views}, fulfilledRequests:{" "}
          {user._count.fulfilledRequests}
        </p>
      );
    });
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
          <Button>load more</Button>
        </Center>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  UserRankingPageProps
> = async (context) => {
  const userViewQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/view`;
  const userSubQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/sub`;
  const userFulfilledRequestsQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/fulfilledRequests`;
  const resUsers = await axios.get<ResRankingUser>(userViewQuery, {
    params: { start: 0, end: 50 },
  });
  const users = resUsers.data;
  return { props: { users } };
};

UserRankingPage.options = {
  auth: false,
  hideTitle: true,
  width: "100%",
} as PageOptions;
