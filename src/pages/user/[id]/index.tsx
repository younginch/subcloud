import {
  Avatar,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";

export default function UserRead() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <Layout>
      <HStack>
        <Avatar
          size="2xl"
          name={data?.user.name ?? undefined}
          src={data?.user.image ?? undefined}
        />
        <Stack>
          <Text>{data?.user.name}</Text>
          <Text>{data?.user.email}</Text>
        </Stack>
      </HStack>
      <Tabs>
        <TabList>
          <Tab>자막 요청</Tab>
          <Tab>영상 자막</Tab>
          <Tab>자막 파일</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
