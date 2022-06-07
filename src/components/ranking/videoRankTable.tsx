import {
  Box,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
  Select,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Spacer,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import router from "next/router";
import { ResRankingVideo } from "../../utils/types";
import VideoTableRow from "./videoRankTableRow";
import RankPagination from "./rankPagination";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  videos: ResRankingVideo;
};

export default function VideoRankTable({ videos }: Props) {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Title", "Language", "Requests", "Points"];
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];
  const [pageIndex, gotoPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageCount, setPageCount] = useState<number>(100);

  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setPageCount(Math.floor((videos.length + pageSize - 1) / pageSize));
  }, [pageSize, videos]);

  const handleSelectSize = (size: number) => {
    setPageSize(size);
    setPageCount(Math.floor((videos.length + size - 1) / size));
  };

  const handleSelectLang = (lang: string) => {
    if (lang === "All Lang") router.push(`/ranking/video`);
    else router.push(`/ranking/video/${lang}`);
  };

  const handleInputSubmit = (event: any) => {
    event.preventDefault();
    console.log(event.target.search.value);
    //TODO : search query with above value
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
            <form onSubmit={handleInputSubmit}>
              <FormControl>
                <HStack>
                  <Input
                    placeholder="Search..."
                    w="300px"
                    id="search"
                    type="search"
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
            {videos
              .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
              .map((video) => {
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
