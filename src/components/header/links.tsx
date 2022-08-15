import React, { ReactElement } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { FaYoutube } from "react-icons/fa";
import { useSession } from "next-auth/react";
import getAuthLink from "../../utils/getAuthLink";

type LinkButtonProps = {
  route: string;
  routeWithAuth?: string;
  width?: string;
  onClick?: () => void;
  highlighted?: boolean;
  leftIcon?: ReactElement;
};
const highlightedColorLight = "#3E3EEE";
const highlightedColorDark = "#99aaff";

function LinkButton({
  route,
  routeWithAuth,
  width,
  onClick,
  highlighted,
  leftIcon,
}: LinkButtonProps) {
  const { t } = useTranslation("routes");
  const highlightedColor = useColorModeValue(
    highlightedColorLight,
    highlightedColorDark
  );
  return (
    <Link href={routeWithAuth ?? route} passHref>
      <Button
        as="a"
        variant="ghost"
        justifyContent="start"
        width={width}
        onClick={onClick}
        color={highlighted ? highlightedColor : ""}
        leftIcon={leftIcon}
      >
        {t(`${route}`)}
      </Button>
    </Link>
  );
}

type LinksProps = {
  width?: string;
  onClick?: () => void;
};

export default function Links({ width, onClick }: LinksProps) {
  const { t } = useTranslation("routes");
  const router = useRouter();
  const highlighted = [false, false, false, false, false];
  const paths = router.pathname.split("/");
  if (router.pathname === "/video/create") {
    if (router.query.next === "request") highlighted[0] = true;
    else highlighted[1] = true;
  } else if (paths[1] === "ranking") {
    highlighted[2] = true;
  } else if (router.pathname === "/buy") {
    highlighted[3] = true;
  } else if (router.pathname === "/channel") {
    highlighted[4] = true;
  }
  const highlightedColor = useColorModeValue(
    highlightedColorLight,
    highlightedColorDark
  );

  const { status } = useSession();

  return (
    <>
      <LinkButton
        route="/video/create?next=request"
        routeWithAuth={getAuthLink(status, "/video/create?next=request")}
        width={width}
        onClick={onClick}
        highlighted={highlighted[0]}
      />
      <LinkButton
        route="/video/create?next=sub"
        routeWithAuth={getAuthLink(status, "/video/create?next=sub")}
        width={width}
        onClick={onClick}
        highlighted={highlighted[1]}
      />
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          width={width}
          textAlign="left"
          rightIcon={<ChevronDownIcon />}
          pr="12px"
          color={highlighted[2] ? highlightedColor : ""}
        >
          {t("/ranking")}
        </MenuButton>
        <MenuList>
          <Link href="/ranking/sub">
            <MenuItem onClick={onClick}>{t("/ranking/sub")}</MenuItem>
          </Link>
          <Link href="/ranking/video">
            <MenuItem onClick={onClick}>{t("/ranking/video")}</MenuItem>
          </Link>
          <Link href="/ranking/user">
            <MenuItem onClick={onClick}>{t("/ranking/user")}</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <LinkButton
        route="/buy"
        width={width}
        onClick={onClick}
        highlighted={highlighted[3]}
      />
      <LinkButton
        route="/channel"
        width={width}
        onClick={onClick}
        highlighted={highlighted[4]}
        leftIcon={<FaYoutube fill="#ff5b5b" size={20} />}
      />
    </>
  );
}
