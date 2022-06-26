import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { GoChevronRight } from "react-icons/go";

type Props = {
  type: "request" | "sub";
  step: number;
};

export default function CreateHeader({ type, step }: Props) {
  return (
    <Stack marginBottom="24px">
      <Heading marginTop="18px">
        {type === "request" ? "자막 요청" : "자막 제작"}
      </Heading>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem isCurrentPage={step === 1}>
          <BreadcrumbLink href="#">영상 선택</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage={step === 2}>
          <BreadcrumbLink href="#">
            {type === "request" ? "자막 언어 선택" : "자막 업로드"}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Stack>
  );
}
