/* eslint-disable react/jsx-no-useless-fragment */
import { List } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { HoList, HangList, Jang, Jo } from "../../components/list";
import { PageOptions } from "../../utils/types";

export default function Terms() {
  const { t } = useTranslation("terms");
  return (
    <List>
      <Jang index={1} title={t("general_rules")}>
        <Jo index={1} title={t("purpose")}>
          {t("purpose_ex")}
        </Jo>
        <Jo index={2} title={t("defintion")}>
          <>{t("definition_header")}</>
          <HoList>
            <>{t("definition_paragraph1")}</>
            <>{t("definition_paragraph2")}</>
            <>{t("definition_paragraph3")}</>
            <>{t("definition_paragraph4")}</>
            <>{t("definition_paragraph5")}</>
            <>{t("definition_paragraph6")}</>
            <>{t("definition_paragraph7")}</>
          </HoList>
        </Jo>
        <Jo index={3} title={t("provision")}>
          {t("provision_header")}
        </Jo>
        <Jo index={4} title={t("posting")}>
          <HangList>
            <>{t("posting_h1")}</>
            <>{t("posting_h2")}</>
            <>{t("posting_h3")}</>
          </HangList>
        </Jo>
        <Jo index={5} title={t("amendment")}>
          <HangList>
            <>{t("amendment_h1")}</>
            <>{t("amendment_h2")}</>
            <>{t("amendment_h3")}</>
          </HangList>
        </Jo>
        <Jo index={6} title={t("interpretation")}>
          {t("interpretation_h1")}
        </Jo>
      </Jang>
      <Jang index={2} title={t("signUp")}>
        <Jo index={7} title={t("signUp")}>
          <HangList>
            <>{t("signUp_h1")}</>
            <>
              {t("signUp_h2")}
              <HoList>
                <>{t("signUp_p1")}</>
                <>{t("signUp_p2")}</>
                <>{t("signUp_p3")}</>
                <>{t("signUp_p4")}</>
                <>{t("signUp_p5")}</>
              </HoList>
            </>
            <>
              {t("signUp_h3")}
              <HoList>
                <>{t("signUp_p6")}</>
                <>{t("signUp_p7")}</>
                <>{t("signUp_p8")}</>
                <>{t("signUp_p9")}</>
              </HoList>
            </>
            <>{t("signUp_h4")}</>
            <>{t("signUp_h5")}</>
            <>{t("signUp_h6")}</>
          </HangList>
        </Jo>
        <Jo index={8} title={t("minor")}>
          <HangList>
            <>{t("minor_h1")}</>
            <>{t("minor_h2")}</>
            <>{t("minor_h3")}</>
          </HangList>
        </Jo>
        <Jo index={9} title={t("membership_info")}>
          <HangList>
            <>{t("membership_h1")}</>
            <>{t("membership_h2")}</>
            <>{t("membership_h3")}</>
          </HangList>
        </Jo>
        <Jo index={10} title={t("obligation_id")}>
          <HangList>
            <>{t("obligation_id_h1")}</>
            <>{t("obligation_id_h2")}</>
            <>{t("obligation_id_h3")}</>
          </HangList>
        </Jo>
        <Jo index={11} title={t("notification")}>
          <HangList>
            <>{t("notification_h1")}</>
            <>{t("notification_h2")}</>
          </HangList>
        </Jo>
        <Jo index={12} title={t("withdrawal")}>
          <HangList>
            <>{t("withdrawal_h1")}</>
            <>
              {t("withdrawal_h2")}
              <HoList>
                <>{t("withdrawal_p1")}</>
                <>{t("withdrawal_p2")}</>
                <>{t("withdrawal_p3")}</>
                <>{t("withdrawal_p4")}</>
              </HoList>
            </>
            <>{t("withdrawal_h3")}</>
            <>{t("withdrawal_h4")}</>
          </HangList>
        </Jo>
      </Jang>
      <Jang index={3} title={t("contentUseAgreement")}>
        <Jo index={13} title={t("content_publish")}>
          <HangList>
            <>
              {t("content_publish_h1")}
              <HoList>
                <>{t("content_publish_p1")}</>
                <>{t("content_publish_p2")}</>
                <>{t("content_publish_p3")}</>
                <>{t("content_publish_p4")}</>
              </HoList>
            </>
            <>{t("content_publish_h2")}</>
          </HangList>
        </Jo>
        <Jo index={14} title={t("establishment")}>
          <HangList>
            <>{t("establishment_h1")}</>
            <>{t("establishment_h2")}</>
            <>{t("establishment_h3")}</>
            <>{t("establishment_h4")}</>
          </HangList>
        </Jo>
        <Jo index={15} title={t("minor_special")}>
          {t("minor_special_h1")}
        </Jo>
        <Jo index={16} title={t("change&cancellation")}>
          <HangList>
            <>{t("change&cancellation_h1")}</>
            <>{t("change&cancellation_h2")}</>
          </HangList>
        </Jo>
        <Jo index={17} title={t("obligation_company")}>
          <>{t("obligation_company_h1")}</>
        </Jo>
        <Jo index={18} title={t("obligation_user")}>
          <HangList>
            <>
              {t("obligation_user_h1")}
              <HoList>
                <>{t("obligation_user_p1")}</>
                <>{t("obligation_user_p2")}</>
                <>{t("obligation_user_p3")}</>
                <>{t("obligation_user_p4")}</>
                <>{t("obligation_user_p5")}</>
                <>{t("obligation_user_p6")}</>
                <>{t("obligation_user_p7")}</>
                <>{t("obligation_user_p8")}</>
              </HoList>
            </>
            <>{t("obligation_user_h2")}</>
          </HangList>
        </Jo>
        <Jo index={19} title={t("payment")}>
          <>{t("payment_h1")}</>
          <HoList>
            <>{t("payment_p1")}</>
            <>{t("payment_p2")}</>
            <>{t("payment_p3")}</>
            <>{t("payment_p4")}</>
            <>{t("payment_p5")}</>
            <>{t("payment_p6")}</>
            <>{t("payment_p7")}</>
            <>{t("payment_p8")}</>
          </HoList>
        </Jo>
        <Jo index={20} title={t("content")}>
          <HangList>
            <>{t("content_h1")}</>
            <>{t("content_h2")}</>
            <>{t("content_h3")}</>
            <>{t("content_h4")}</>
            <>{t("content_h5")}</>
          </HangList>
        </Jo>
        <Jo index={21} title={t("content_change")}>
          <HangList>
            <>{t("content_change_h1")}</>
            <>{t("content_change_h2")}</>
            <>{t("content_change_h3")}</>
            <>{t("content_change_h4")}</>
          </HangList>
          ① ② ③ ④
        </Jo>
        <Jo index={22} title={t("info&ads")}>
          <HangList>
            <>{t("info&ads_h1")}</>
            <>{t("info&ads_h2")}</>
            <>{t("info&ads_h3")}</>
          </HangList>
        </Jo>
        <Jo index={23} title={t("del")}>
          <HangList>
            <>{t("del_h1")}</>
            <>{t("del_h2")}</>
          </HangList>
        </Jo>
        <Jo index={24} title={t("copyRight")}>
          <HangList>
            <>{t("copyRight_h1")}</>
            <>{t("copyRight_h2")}</>
            <>{t("copyRight_h3")}</>
            <>{t("copyRight_h4")}</>
          </HangList>
        </Jo>
        <Jo index={25} title={t("privacy")}>
          <HangList>
            <>{t("privacy_h1")}</>
            <>{t("privacy_h2")}</>
            <>
              {t("privacy_h3")}
              <HoList>
                <>{t("privacy_p1")}</>
                <>{t("privacy_p2")}</>
                <>{t("privacy_p3")}</>
                <>{t("privacy_p4")}</>
              </HoList>
            </>
            <>{t("privacy_h4")}</>
            <>{t("privacy_h5")}</>
            <>{t("privacy_h6")}</>
            <>{t("privacy_h7")}</>
            <>{t("privacy_h8")}</>
            <>{t("privacy_h9")}</>
          </HangList>
        </Jo>
      </Jang>
      <Jang index={4} title={t("withdrawal_jang")}>
        <Jo index={26} title={t("withdrawal_jo")}>
          <HangList>
            <>
              {t("withdrawal_user_h1")}
              <HoList>
                <>{t("withdrawal_user_p1")}</>
                <>{t("withdrawal_user_p2")}</>
                <>{t("withdrawal_user_p3")}</>
              </HoList>
            </>
            <>
              {t("withdrawal_user_h2")}
              <HoList>
                <>{t("withdrawal_user_p4")}</>
                <>{t("withdrawal_user_p5")}</>
                <>{t("withdrawal_user_p6")}</>
              </HoList>
            </>
            <>{t("withdrawal_user_h3")}</>
            <>{t("withdrawal_user_h4")}</>
            <>{t("withdrawal_user_h5")}</>
          </HangList>
        </Jo>
        <Jo index={27} title={t("withdrawal_effect")}>
          <HangList>
            <>{t("withdrawal_effect_h1")}</>
            <>{t("withdrawal_effect_h2")}</>
            <>{t("withdrawal_effect_h3")}</>
            <>{t("withdrawal_effect_h4")}</>
            <>{t("withdrawal_effect_h5")}</>
          </HangList>
        </Jo>
        <Jo index={28} title={t("cancellation")}>
          <HangList>
            <>{t("cancellation_h1")}</>
            <>{t("cancellation_h2")}</>
            <>{t("cancellation_h3")}</>
          </HangList>
        </Jo>
        <Jo index={29} title={t("cancel_effect")}>
          {t("cancel_effect_h1")}
        </Jo>
      </Jang>
      <Jang index={5} title={t("etc_title")}>
        <Jo index={30} title={t("etc_refund")}>
          <HangList>
            <>{t("etc_refund_h1")}</>
            <>
              {t("etc_refund_h2")}
              <HoList>
                <>{t("etc_refund_p1")}</>
                <>{t("etc_refund_p2")}</>
              </HoList>
            </>
            <>{t("etc_refund_h3")}</>
          </HangList>
        </Jo>
        <Jo index={31} title={t("etc_error")}>
          <HangList>
            <>{t("etc_error_h1")}</>
            <>{t("etc_error_h2")}</>
            <>{t("etc_error_h3")}</>
            <>{t("etc_error_h4")}</>
          </HangList>
        </Jo>
        <Jo index={32} title={t("compensation")}>
          {t("compensation_h1")}
        </Jo>
        <Jo index={33} title={t("exemption_provisions")}>
          <HangList>
            <>{t("exemption_provisions_h1")}</>
            <>{t("exemption_provisions_h2")}</>
            <>{t("exemption_provisions_h3")}</>
            <>{t("exemption_provisions_h4")}</>
          </HangList>
        </Jo>
        <Jo index={34} title={t("dispute")}>
          {t("dispute_h1")}
        </Jo>
      </Jang>
    </List>
  );
}

Terms.options = { auth: false } as PageOptions;
