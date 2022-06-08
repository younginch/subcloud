import React from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";

type LinksProps = {
  width?: string;
};

export default function Links({ width }: LinksProps) {
  return (
    <>
      <LinkButton route="/video/create?next=request" width={width} />
      <LinkButton route="/video/create?next=sub" width={width} />
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          width={width}
          textAlign="left"
          rightIcon={<ChevronDownIcon />}
        >
          랭킹
        </MenuButton>
        <MenuList>
          <Link href="/ranking/sub">
            <MenuItem>Sub</MenuItem>
          </Link>
          <Link href="/ranking/user">
            <MenuItem>User</MenuItem>
          </Link>
          <Link href="/ranking/video">
            <MenuItem>Video</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <LinkButton route="/buy" width={width} />
      <LinkButton route="/qna" width={width} />
    </>
  );
}

type LinkButtonProps = {
  route: string;
  width?: string;
};

function LinkButton({ route, width }: LinkButtonProps) {
  const { t } = useTranslation("routes");

  return (
    <Link href={`${route}`} passHref>
      <Button
        as="a"
        variant="ghost"
        flexDirection="column"
        alignItems="start"
        width={width}
      >
        {t(`${route}`)}
      </Button>
    </Link>
  );
}
