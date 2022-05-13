import React from "react";
import { Button } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

type LinksProps = {
  width?: string;
};

export default function Links({ width }: LinksProps) {
  return (
    <>
      <LinkButton route="/video/create?next=request" width={width} />
      <LinkButton route="/video/create?next=sub" width={width} />
      <LinkButton route="/ranking" width={width} />
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
