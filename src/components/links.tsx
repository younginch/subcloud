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
      <LinkButton route="/contribution" width={width} />
      <LinkButton route="/request" width={width} />
      <LinkButton route="/trending" width={width} />
    </>
  );
}

type LinkButtonProps = {
  route: string;
  width?: string;
};

function LinkButton({ route: name, width }: LinkButtonProps) {
  const { t } = useTranslation("routes");

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
