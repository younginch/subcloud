import { Stack, Heading } from "@chakra-ui/react";
import PublicProfileLayout from "../../../components/user/publicProfileLayout";
import { PublicProfileTab } from "../../../utils/enums";
import { PageOptions } from "../../../utils/types";

export default function UserRequest() {
  return (
    <PublicProfileLayout currentTab={PublicProfileTab.Request}>
      <Stack alignItems="center" h="55vh">
        <Heading
          mt={5}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="40px"
          fontWeight="extrabold"
          h="60px"
        >
          Comming Soon
        </Heading>
      </Stack>
    </PublicProfileLayout>
  );
}

UserRequest.options = {
  auth: false,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
