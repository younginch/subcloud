import {
  Heading,
  Stack,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Box,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import AnnouncePanel from "../components/board/announcePanel";
import { PageOptions } from "../utils/types";

export default function Board() {
  const highlightedColorLight = "#3E3EEE";
  const highlightedColorDark = "#99aaff";
  const responsibleColor = useColorModeValue(
    highlightedColorLight,
    highlightedColorDark
  );
  const [isPc] = useMediaQuery("(min-width: 1190px)");

  return (
    <Stack alignItems="center">
      <Box
        w="1140px"
        maxW="100vw"
        p={isPc ? "70px 0px 20px 0px" : "70px 0px 20px 20px"}
      >
        <Heading w="fit-content">게시판</Heading>
      </Box>
      <Tabs w="100%">
        <TabList pl={isPc ? "calc(50vw - 585px)" : "10px"}>
          <Tab
            _selected={{
              borderColor: responsibleColor,
              color: responsibleColor,
            }}
            borderBottomWidth="3px"
            fontSize="20px"
            fontWeight="bold"
          >
            공지사항
          </Tab>
          <Tab
            _selected={{
              borderColor: responsibleColor,
              color: responsibleColor,
            }}
            borderBottomWidth="3px"
            fontSize="20px"
            fontWeight="bold"
          >
            이벤트
          </Tab>
        </TabList>
        <TabPanels
          pl={isPc ? "calc(50vw - 585px)" : "10px"}
          pr={isPc ? "0px" : "10px"}
          pt="20px"
        >
          <TabPanel w="1140px" maxW="100%">
            <AnnouncePanel />
          </TabPanel>
          <TabPanel w="1140px" maxW="100%">
            <AnnouncePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

Board.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
