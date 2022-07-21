import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

type Props = {
  type: "request" | "sub";
  step: number;
};

export default function CreateHeader({ type, step }: Props) {
  const { t } = useTranslation("create");
  return (
    <Stack marginBottom="24px" alignItems="center">
      <Heading
        marginTop="18px"
        fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
        textAlign="center"
      >
        {type === "request" ? t("center_h1") : t("center_h1_up")}
      </Heading>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon />}
        fontSize={{ base: "16px", md: "20px" }}
      >
        <BreadcrumbItem isCurrentPage={step === 1}>
          <BreadcrumbLink href="#">{t("center_below_front")}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage={step === 2}>
          <BreadcrumbLink href="#">
            {type === "request" ? t("center_below_back") : t("center_h1_up")}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Stack>
  );
}
