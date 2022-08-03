/* eslint-disable react/jsx-no-useless-fragment */
import { ListItem, UnorderedList, Text, List } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { HoList, HangList, Jo } from "../../components/list";
import { PageOptions } from "../../utils/types";

export default function Privacy() {
  const { t } = useTranslation("privacy");
  return (
    <List>
      <Text>{t("privacy_title")}</Text>
      <UnorderedList>
        <ListItem>{t("privacy_title_p1")}</ListItem>
      </UnorderedList>
      <Jo index={1} title={t("privacy_object")}>
        <Text>{t("privacy_object_h1")}</Text>
        <HoList>
          <>{t("privacy_object_p1")}</>
          <>{t("privacy_object_p2")}</>
          <>{t("privacy_object_p3")}</>
          <>{t("privacy_object_p4")}</>
        </HoList>
      </Jo>
      <Jo index={2} title={t("privacy_process")}>
        <>{t("privacy_process_h1")}</>
        <>
          {t("privacy_process_h2")}
          <HoList>
            <>{t("privacy_process_p1")}</>
            <>{t("privacy_process_p2")}</>
            <>{t("privacy_process_p3")}</>
            <>{t("privacy_process_p4")}</>
          </HoList>
        </>
      </Jo>
      <Jo index={3} title={t("privacy_processItem")}>
        <HangList>{t("privacy_processItem_h1")}</HangList>
        <HoList>
          <>{t("privacy_processItem_p1")}</>
          <>{t("privacy_processItem_p2")}</>
        </HoList>
      </Jo>
      <Jo index={4} title={t("destruction")}>
        <HangList>
          <>{t("destruction_h1")}</>
          <>
            {t("destruction_h2")}
            <HoList>
              <>{t("destruction_p1")}</>
              <>{t("destruction_p2")}</>
            </HoList>
          </>
          <>
            {t("destruction_h3")}
            <HoList>
              <>{t("destruction_p3")}</>
              <>{t("destruction_p4")}</>
            </HoList>
          </>
        </HangList>
      </Jo>
      <Jo index={5} title={t("obligation")}>
        <HangList>
          <>{t("obligation_h1")}</>
          <>{t("oblitgation_h2")}</>
          <>{t("oblitgation_h3")}</>
          <>{t("oblitgation_h4")}</>
          <>{t("oblitgation_h5")}</>
          <>{t("oblitgation_h6")}</>
        </HangList>
      </Jo>
      <Jo index={6} title={t("safety")}>
        <>{t("safety_h1")}</>
        <HoList>
          <>{t("safety_p1")}</>
          <>{t("safety_p2")}</>
          <>{t("safety_p3")}</>
          <>{t("safety_p4")}</>
          <>{t("safety_p5")}</>
          <>{t("safety_p6")}</>
          <>{t("safety_p7")}</>
        </HoList>
      </Jo>
      <Jo index={7} title={t("installation")}>
        <HangList>
          <>{t("installation_h1")}</>
          <>{t("installation_h2")}</>
        </HangList>
      </Jo>
      <Jo index={8} title={t("collection")}>
        <HangList>
          <>{t("collection_h1")}</>
          <>{t("collection_h2")}</>
          <>{t("collection_h3")}</>
          <>{t("collection_h4")}</>
          <>{t("collection_h5")}</>
          <>
            {t("collection_h6")}
            <Text>{t("collection_h7")}</Text>
            <Text>{t("collection_h8")}</Text>
            <Text>{t("collection_h9")}</Text>
            <Text>{t("collection_h10")}</Text>
          </>
          <>
            {t("collection_h11")}
            <Text>{t("collection_h12")}</Text>
            <Text>{t("collection_h13")}</Text>
            <Text>{t("collection_h14")}</Text>
            <Text>{t("collection_h15")}</Text>
          </>
          <>
            {t("collection_h16")}
            <Text>{t("collection_h17")}</Text>
            <Text>{t("collection_h18")}</Text>
            <Text>{t("collection_h19")}</Text>
            <Text>{t("collection_h20")}</Text>
          </>
        </HangList>
      </Jo>
      <Jo index={9} title={t("pseudonymous")}>
        <>{t("pseudonymous_h1")}</>
        <Text>{t("pseudonymous_h2")}</Text>
        <Text>{t("pseudonymous_h3")}</Text>
        <HangList>
          <>
            {t("pseudonymous_p1")}
            <Text>{t("pseudonymous_p2")}</Text>
            <Text>{t("pseudonymous_p3")}</Text>
            <Text>{t("pseudonymous_p4")}</Text>
            <Text>{t("pseudonymous_p5")}</Text>
            <Text>{t("pseudonymous_p6")}</Text>
            <Text>{t("pseudonymous_p7")}</Text>
            <Text>{t("pseudonymous_p8")}</Text>
            <Text>{t("pseudonymous_p9")}</Text>
            <Text>{t("pseudonymous_p10")}</Text>
            <Text>{t("pseudonymous_p11")}</Text>
          </>
          <>{t("pseudonymous_p12")}</>
        </HangList>
      </Jo>
      <Jo index={10} title={t("representative")}>
        <>{t("representative_h1")}</>
        <Text>{t("representative_h2")}</Text>
        <Text>{t("representative_h3")}</Text>
        <Text>{t("representative_h4")}</Text>
        <Text>{t("representative_h5")}</Text>
        <Text>{t("representative_h6")}</Text>
        <>{t("representative_h7")}</>
        <Text>{t("representative_h8")}</Text>
        <Text>{t("representative_h9")}</Text>
        <Text>{t("representative_h10")}</Text>
        <Text>{t("representative_h11")}</Text>
      </Jo>
      <Jo index={11} title={t("change")}>
        <HangList>
          <>{t("change_h1")}</>
          <>{t("change_h2")}</>
        </HangList>
      </Jo>
    </List>
  );
}

Privacy.options = { auth: false } as PageOptions;
