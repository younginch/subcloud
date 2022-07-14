import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { GoChevronRight } from "react-icons/go";

type Props = {
  type: "request" | "sub";
  step: number;
};

export default function CreateHeader({ type, step }: Props) {
  const { t } = useTranslation("requestSub");
  return (
    <Stack marginBottom="24px" alignItems="center">
      <Heading
        marginTop="18px"
        fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
        textAlign="center"
        color="white"
      >
        {type === "request" ? t("center_h1") : t("center_h1_up")}
      </Heading>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="white" />}
        fontSize={{ base: "16px", md: "20px" }}
        color="white"
      >
        <BreadcrumbItem isCurrentPage={step === 1}>
          <BreadcrumbLink href="#">{t("center_below_front")}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage={step === 2}>
          <BreadcrumbLink href="#">
            {type === "request" ? t("center_below_back") : "자막 업로드"}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Stack>
  );
}
