import { Button, HStack, List, ListItem } from "@chakra-ui/react";
import Link from "next/link";

type AdminMenuProps = {
  href: string;
  title: string;
};

function AdminMenu({ href, title }: AdminMenuProps) {
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

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <HStack>
      <List w="120px">
        <AdminMenu href="/admin" title="메인" />
        <AdminMenu href="/admin/user" title="사용자" />
        <AdminMenu href="/admin/profit" title="수익분배" />
      </List>
      {children}
    </HStack>
  );
}
