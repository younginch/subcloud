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
      <LinkButton name="contribution" width={width} />
      <LinkButton name="request" width={width} />
      <LinkButton name="trending" width={width} />
    </>
  );
}

type LinkButtonProps = {
  name: string;
  width?: string;
};

function LinkButton({ name, width }: LinkButtonProps) {
  const { t } = useTranslation("common");

  return (
    <Link href={`/${name}`} passHref>
      <Button
        variant="ghost"
        flexDirection="column"
        alignItems="start"
        width={width}
      >
        {t(`${name}`)}
      </Button>
    </Link>
  );
}
