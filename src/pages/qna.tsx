import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { PageOptions } from "../utils/types";

type QnAProps = {
  title: string;
  children: React.ReactNode;
};

function QnAAccordion({ title, children }: QnAProps) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading size="md">{title}</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
}

export default function QnaPage() {
  const { t } = useTranslation("qna");
  return (
    <Accordion>
      <QnAAccordion title={t("accordion_title_service")}>
        <a
          href="https://chrome.google.com/webstore/detail/subcloud/ocjfkiipkmckngedlljnkackhohcffpa?hl=ko"
          style={{ color: "#6666ff" }}
        >
          {t("store_link")}
        </a>
        {t("accordion_title_service_ex")}
      </QnAAccordion>
      <QnAAccordion title={t("accordion_title_no_sub")}>
        {t("accordion_title_no_sub_ex")}
      </QnAAccordion>
      <QnAAccordion title={t("accordion_title_upload")}>
        {t("accordion_title_upload_ex")}
      </QnAAccordion>
      <QnAAccordion title={t("accordion_title_unvisible")}>
        {t("accordion_title_unvisible_ex")}
      </QnAAccordion>
      <QnAAccordion title={t("accordion_title_legal")}>
        {t("accordion_title_legal_ex")}
      </QnAAccordion>
      <QnAAccordion title={t("accordion_title_point")}>
        {t("accordion_title_point_ex")}
      </QnAAccordion>
    </Accordion>
  );
}

QnaPage.options = { auth: false, width: "6xl" } as PageOptions;
