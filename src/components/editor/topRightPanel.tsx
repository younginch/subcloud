import {
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineRateReview, MdOutlineShortcut } from "react-icons/md";
import BreifReviews from "../review/breifReviews";
import Shortcuts from "./shortcuts";

export default function TopRightPanel() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const headerBg = useColorModeValue("gray.100", "#181818");
  const headerBodyBg = useColorModeValue("white", "#1f1f1f");

  return (
    <Stack bg={headerBodyBg} h="100%">
      <Tabs variant="unstyled" onChange={(index: number) => setTabIndex(index)}>
        <TabList bg={headerBg} h="30px">
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            <HStack>
              <MdOutlineShortcut />
              {tabIndex === 0 && <Text>단축키</Text>}
            </HStack>
          </Tab>
          <Tab _selected={{ color: "white", bg: "green.400" }} isDisabled>
            <HStack>
              <MdOutlineRateReview />
              {tabIndex === 1 && <Text>리뷰 현황</Text>}
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Shortcuts />
          </TabPanel>
          <TabPanel>
            <BreifReviews />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
