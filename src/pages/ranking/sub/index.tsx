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
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useForm } from "react-hook-form";
import router from "next/router";
import SubRankTableRow from "../../../components/ranking/subRankTableRow";

type SubRankingPageProps = {
  subs: ResRankingSub;
};

type FormData = {
  keyword: string;
};

export default function SubRankingPage({ subs }: SubRankingPageProps) {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Title", "Language", "Views", "Madeby", "Uploaded"];
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    const { keyword } = values;
    //Todo: searching keyword
  }

  const handleSelectLang = (lang: string) => {
    if (lang === "All Lang") router.push(`/ranking/video`);
    else router.push(`/ranking/video/${lang}`);
  };

  const subRanking = () => {
    return subs.map((sub) => {
      return (
        <p key={sub.id}>
          views: {sub.views}, platform: {sub.serviceId}, video url:{" "}
          {sub.video.url}, video name:{" "}
          {sub.video.youtubeVideo ? sub.video.youtubeVideo.title : "no title"},
          video channel:{" "}
          {sub.video.youtubeVideo
            ? sub.video.youtubeVideo.channel.title
            : "no title"}
          , user name: {sub.user.name}, user email: {sub.user.email}, user
          image: {sub.user.image}
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
          <Button>load more</Button>
        </Center>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  SubRankingPageProps
> = async (context) => {
  const subQuery = `${process.env.NEXTAUTH_URL}/api/ranking/sub/view`;
  const resSubs = await axios.get<ResRankingSub>(subQuery, {
    params: { start: 0, end: 50 },
  });
  const subs = resSubs.data;
  return { props: { subs } };
};

SubRankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
