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
  FormControl,
  Input,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { PageOptions, ResRankingVideo } from "../../../utils/types";
import { GetServerSideProps } from "next";
import router from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineSearch } from "react-icons/ai";
import VideoTableRow from "../../../components/ranking/videoRankTableRow";
import { useForm } from "react-hook-form";

type RankingPageProps = {
  videos: ResRankingVideo;
};

type FormData = {
  keyword: string;
};

export default function RankingPage({ videos }: RankingPageProps) {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Title", "Language", "Requests", "Points"];
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];

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
            {videos.map((video) => {
              return (
                <VideoTableRow
                  key={video.videoId}
                  name={
                    video.youtubeVideo ? video.youtubeVideo.title : "no title"
                  }
                  platform={video.serviceId}
                  requests={video._count.requests}
                  points={video._count.points}
                  url={video.url}
                />
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<RankingPageProps> = async (
  context
) => {
  const videoRequestQuery = `${process.env.NEXTAUTH_URL}/api/ranking/video/request`;
  const videoPointQuery = `${process.env.NEXTAUTH_URL}/api/ranking/video/point`;
  const resVideos = await axios.get<ResRankingVideo>(videoRequestQuery, {
    params: { start: 0, end: 50 },
  });
  const videos = resVideos.data;
  return { props: { videos } };
};

RankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
