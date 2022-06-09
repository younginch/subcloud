import { Button, HStack, List, ListItem } from "@chakra-ui/react";
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

type UserLayoutProps = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <HStack>
      <List w="120px">
        <UserMenu href="/user/my" title="메인" />
        <UserMenu href="/user/my/request" title="자막 요청" />
        <UserMenu href="/user/my/history" title="시청 기록" />
        <UserMenu href="/user/my/order" title="결제 기록" />
        <UserMenu href="/user/my/sub" title="제작한 자막" />
      </List>
      {children}
    </HStack>
  );
}
