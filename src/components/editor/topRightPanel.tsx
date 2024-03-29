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
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { MdOutlineRateReview, MdOutlineShortcut } from "react-icons/md";
import BreifReviews from "../review/breifReviews";
import QuickUpload from "./quickUpload";
import Shortcuts from "./shortcuts";

type Props = {
  subId?: string;
};

export default function TopRightPanel({ subId }: Props) {
  const { t } = useTranslation("editor");
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
              {tabIndex === 0 && <Text>{t("keyboard_shortcut")}</Text>}
            </HStack>
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            <HStack>
              <BsCloudUpload />
              {tabIndex === 1 && <Text>{t("quick_upload")}</Text>}
            </HStack>
          </Tab>
          <Tab _selected={{ color: "white", bg: "green.400" }} isDisabled>
            <HStack>
              <MdOutlineRateReview />
              {tabIndex === 2 && <Text>{t("review")}</Text>}
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Shortcuts />
          </TabPanel>
          <TabPanel>
            <QuickUpload />
          </TabPanel>
          <TabPanel>{subId && <BreifReviews subId={subId} />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
