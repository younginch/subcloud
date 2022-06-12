import PublicProfileLayout from "../../../components/user/publicProfileLayout";
import { PublicProfileTab } from "../../../utils/tabs";
import { PageOptions } from "../../../utils/types";
import { Text } from "@chakra-ui/react";

export default function UserSubtitle() {
  return (
    <PublicProfileLayout currentTab={PublicProfileTab.Subtitle}>
      <Text>Subtitle</Text>
    </PublicProfileLayout>
  );
}

UserSubtitle.options = { auth: false, hideTitle: true } as PageOptions;
