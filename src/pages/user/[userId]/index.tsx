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
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import RequestPanel from "../../../components/user/requestPanel";
import SubPanel from "../../../components/user/subPanel";
import { ResRequestSearch, ResSubSearch } from "../../../utils/types";

const TAB_LIST = ["request", "sub", "file"];

type UserReadProps = {
  requests: ResRequestSearch;
  subs: ResSubSearch;
};

export default function UserRead({ requests, subs }: UserReadProps) {
  const router = useRouter();
  const { data } = useSession();

  function getTabIndex() {
    if (router.query.tab === "request") {
      return 0;
    } else if (router.query.tab === "sub") {
      return 1;
    } else {
      return 0;
    }
  }

  function onChangeTabIndex(index: number) {
    router.push(`/user/${router.query.userId}?tab=${TAB_LIST[index]}`);
  }

  return (
    <>
      <HStack marginBottom="18px">
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
      <Tabs isLazy index={getTabIndex()} onChange={onChangeTabIndex}>
        <TabList>
          <Tab>자막 요청</Tab>
          <Tab>영상 자막</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RequestPanel requests={requests} />
          </TabPanel>
          <TabPanel>
            <SubPanel subs={subs} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<UserReadProps> = async (
  context
) => {
  const { userId } = context.query;
  const requestsRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/request/search?userId=${userId}`
  );
  const subsRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/sub/search?userId=${userId}`
  );
  return {
    props: {
      requests: requestsRes.data,
      subs: subsRes.data,
    },
  };
};
