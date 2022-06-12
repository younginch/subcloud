import PublicProfileLayout from "../../../components/user/publicProfileLayout";
import { PublicProfileTab } from "../../../utils/tabs";
import { PageOptions } from "../../../utils/types";
import { Text } from "@chakra-ui/react";

export default function UserRequest() {
  return (
    <PublicProfileLayout currentTab={PublicProfileTab.Request}>
      <Text>Request</Text>
    </PublicProfileLayout>
  );
}

UserRequest.options = { auth: false, hideTitle: true } as PageOptions;
