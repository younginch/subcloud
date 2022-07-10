import React from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";

type LinksProps = {
  width?: string;
  onClick?: () => void;
};

export default function Links({ width, onClick }: LinksProps) {
  const { t } = useTranslation("routes");

  return (
    <>
      <LinkButton
        route="/video/create?next=request"
        width={width}
        onClick={onClick}
      />
      <LinkButton
        route="/video/create?next=sub"
        width={width}
        onClick={onClick}
      />
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          width={width}
          textAlign="left"
          rightIcon={<ChevronDownIcon />}
          pr="12px"
        >
          {t("/ranking")}
        </MenuButton>
        <MenuList>
          <Link href="/ranking/sub">
            <MenuItem onClick={onClick}>{t("/ranking/sub")}</MenuItem>
          </Link>
          <Link href="/ranking/user">
            <MenuItem onClick={onClick}>{t("/ranking/user")}</MenuItem>
          </Link>
          <Link href="/ranking/video">
            <MenuItem onClick={onClick}>{t("/ranking/video")}</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <LinkButton route="/buy" width={width} onClick={onClick} />
      <LinkButton route="/editor" width={width} onClick={onClick} />
    </>
  );
}

type LinkButtonProps = {
  route: string;
  width?: string;
  onClick?: () => void;
};

function LinkButton({ route, width, onClick }: LinkButtonProps) {
  const { t } = useTranslation("routes");

  return (
    <Link href={`${route}`} passHref>
      <Button
        as="a"
        variant="ghost"
        flexDirection="column"
        alignItems="start"
        width={width}
        onClick={onClick}
      >
        {t(`${route}`)}
      </Button>
    </Link>
  );
}
