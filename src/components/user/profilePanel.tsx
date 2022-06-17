import {
  DrawerCloseButton,
  DrawerHeader,
  Text,
  DrawerBody,
  List,
  Divider,
  ListItem,
  Button,
  HStack,
  Stack,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";

type UserMenuProps = {
  href: string;
  title: string;
};

function UserMenu({ href, title }: UserMenuProps) {
  return (
    <ListItem>
      <Link href={href} passHref>
        <Button
          variant="ghost"
          w="100%"
          flexDirection="column"
          alignItems="start"
        >
          {title}
        </Button>
      </Link>
    </ListItem>
  );
}

type Props = {
  isFixed?: boolean;
};
export default function ProfilePannel({ isFixed }: Props) {
  const navHeight = "60px";
  return (
    <Stack>
      <Box pt={navHeight} px="24px">
        {!isFixed && <DrawerCloseButton />}
        <Text fontSize="xl" fontWeight="bold" mt="16px">
          My Profile
        </Text>
        <Text fontSize="md" mb="16px">
          See your dashboard options.
        </Text>
        <Divider />
      </Box>
      <Box>
        <List w="120px">
          <UserMenu href="/user/my" title="메인" />
          <UserMenu href="/user/my/request" title="자막 요청" />
          <UserMenu href="/user/my/history" title="시청 기록" />
          <UserMenu href="/user/my/order" title="결제 기록" />
          <UserMenu href="/user/my/sub" title="제작한 자막" />
        </List>
      </Box>
    </Stack>
  );
}
