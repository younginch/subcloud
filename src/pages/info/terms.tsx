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
        <Jo index={22} title="정보의 제공 및 광고의 게재">
          <HangList>
            <>
              “회사”는 “이용자”가 콘텐츠이용 중 필요하다고 인정되는 다양한
              정보를 공지사항이나 전자우편 등의 방법으로 “회원”에게 제공할 수
              있습니다. 다만, “회원”은 언제든지 전자우편 등을 통하여 수신 거절을
              할 수 있습니다.
            </>
            <>
              제1항의 정보를 전화 및 모사전송기기에 의하여 전송하려고 하는
              경우에는 “회원”의 사전 동의를 받아서 전송합니다.
            </>
            <>
              “회사”는 “콘텐츠”서비스 제공과 관련하여 콘텐츠화면, 홈페이지,
              전자우편 등에 광고를 게재할 수 있습니다. 광고가 게재된 전자우편
              등을 수신한 “회원”은 수신거절을 “회사”에게 할 수 있습니다.
            </>
          </HangList>
        </Jo>
        <Jo index={23} title="게시물의 삭제">
          <HangList>
            <>
              “회사”는 게시판에 정보통신망이용촉진 및 정보보호 등에 관한 법률을
              위반한 청소년유해매체물이 게시되어 있는 경우에는 이를 지체 없이
              삭제 합니다. 다만, 19세 이상의 “이용자”만 이용할 수 있는 게시판은
              예외로 합니다.
            </>
            <>
              “회사”가 운영하는 게시판 등에 게시된 정보로 인하여 법률상 이익이
              침해된 자는 “회사”에게 당해 정보의 삭제 또는 반박내용의 게재를
              요청할 수 있습니다. 이 경우 “회사”는 지체 없이 필요한 조치를
              취하고 이를 즉시 신청인에게 통지합니다.
            </>
          </HangList>
        </Jo>
        <Jo index={24} title="저작권 등의 귀속">
          <HangList>
            <>
              “회사”가 작성한 저작물에 대한 저작권 기타 지적재산권은 “회사”에
              귀속합니다.
            </>
            <>
              “회사”가 제공하는 서비스 중 제휴계약에 의해 제공되는 저작물에 대한
              저작권 기타 지적재산권은 해당 제공업체에 귀속합니다.
            </>
            <>
              “이용자”는 “회사”가 제공하는 서비스를 이용함으로써 얻은 정보 중
              “회사” 또는 제공업체에 지적재산권이 귀속된 정보를 “회사” 또는
              제공업체의 사전승낙 없이 복제, 전송, 출판, 배포, 방송 기타 방법에
              의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안
              됩니다.
            </>
            <>
              “회사”는 약정에 따라 “이용자”의 저작물을 사용하는 경우 당해
              “이용자”의 허락을 받습니다.
            </>
          </HangList>
        </Jo>
        <Jo index={25} title="개인정보보호">
          <HangList>
            <>
              “회사”는 제7조 제2항의 신청서기재사항 이외에 “이용자”의
              콘텐츠이용에 필요한 최소한의 정보를 수집할 수 있습니다. 이를 위해
              “회사”가 문의한 사항에 관해 “이용자”는 진실한 내용을 성실하게
              고지하여야 합니다.
            </>
            <>
              “회사”가 “이용자”의 개인 식별이 가능한 “개인정보”를 수집하는
              때에는 당해 “이용자”의 동의를 받습니다.
            </>
            <>
              “회사”는 “이용자”가 이용신청 등에서 제공한 정보와 제1항에 의하여
              수집한 정보를 당해 “이용자”의 동의 없이 목적 외로 이용하거나
              제3자에게 제공할 수 없으며, 이를 위반한 경우에 모든 책임은
              “회사”가 집니다. 다만, 다음의 경우에는 예외로 합니다.
              <HoList>
                <>
                  통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정
                  개인을 식별할 수 없는 형태로 제공하는 경우
                </>
                <>“콘텐츠” 제공에 따른 요금정산을 위하여 필요한 경우</>
                <>도용방지를 위하여 본인확인에 필요한 경우</>
                <>
                  약관의 규정 또는 법령에 의하여 필요한 불가피한 사유가 있는
                  경우
                </>
              </HoList>
            </>
            <>
              “회사”가 제2항과 제3항에 의해 “이용자”의 동의를 받아야 하는
              경우에는 “개인정보”관리책임자의 신원(소속, 성명 및 전화번호 기타
              연락처), 정보의 수집목적 및 이용목적, 제3자에 대한
              정보제공관련사항(제공받는 자, 제공목적 및 제공할 정보의 내용)등에
              관하여 정보통신망이용촉진 및 정보보호 등에 관한 법률 제22조
              제2항이 규정한 사항을 명시하고 고지하여야 합니다.
            </>
            <>“이용자”는 언제든지 제3항의 동의를 임의로 철회할 수 있습니다.</>
            <>
              “이용자”는 언제든지 “회사”가 가지고 있는 자신의 “개인정보”에 대해
              열람 및 오류의 정정을 요구할 수 있으며, “회사”는 이에 대해 지체
              없이 필요한 조치를 취할 의무를 집니다. “이용자”가 오류의 정정을
              요구한 경우에는 “회사”는 그 오류를 정정할 때까지 당해 “개인정보”를
              이용하지 않습니다.
            </>
            <>
              “회사”는 개인정보보호를 위하여 관리자를 한정하여 그 수를
              최소화하며, 신용카드, 은행계좌 등을 포함한 “이용자”의 “개인정보”의
              분실, 도난, 유출, 변조 등으로 인한 “이용자”의 손해에 대하여 책임을
              집니다.
            </>
            <>
              “회사” 또는 그로부터 “개인정보”를 제공받은 자는 “이용자”가 동의한
              범위 내에서 “개인정보”를 사용할 수 있으며, 목적이 달성된 경우에는
              당해 “개인정보”를 지체 없이 파기합니다.
            </>
            <>
              “회사”는 정보통신망이용촉진 및 정보보호에 관한 법률 등 관계 법령이
              정하는 바에 따라 “이용자”의 “개인정보”를 보호하기 위해 노력합니다.
              “개인정보”의 보호 및 사용에 대해서는 관련법령 및 “회사”의
              개인정보보호정책이 적용됩니다.
            </>
          </HangList>
        </Jo>
      </Jang>
      <Jang
        index={4}
        title="콘텐츠이용계약의 청약철회, 계약해제․해지 및 이용제한"
      >
        <Jo index={26} title="“이용자”의 청약철회와 계약해제․해지">
          <HangList>
            <>
              “회사”와 “콘텐츠”의 이용에 관한 계약을 체결한 “이용자”는
              수신확인의 통지를 받은 날로부터 7일 이내에는 청약의 철회를 할 수
              있습니다. 다만, “회사”가 다음 각 호중 하나의 조치를 취한 경우에는
              “이용자”의 청약철회권이 제한될 수 있습니다.
              <HoList>
                <>
                  청약의 철회가 불가능한 “콘텐츠”에 대한 사실을 표시사항에
                  포함한 경우
                </>
                <>시용상품을 제공한 경우</>
                <>한시적 또는 일부이용 등의 방법을 제공한 경우</>
              </HoList>
            </>
            <>
              “이용자”는 다음 각 호의 사유가 있을 때에는 당해 “콘텐츠”를
              공급받은 날로부터 3월 이내 또는 그 사실을 안 날 또는 알 수 있었던
              날부터 30일 이내에 콘텐츠이용계약을 해제․해지할 수 있습니다.
              <HoList>
                <>이용계약에서 약정한 “콘텐츠”가 제공되지 않는 경우</>
                <>
                  제공되는 “콘텐츠”가 표시․광고 등과 상이하거나 현저한 차이가
                  있는 경우
                </>
                <>
                  기타 “콘텐츠”의 결함으로 정상적인 이용이 현저히 불가능한 경우
                </>
              </HoList>
            </>
            <>
              제1항의 청약철회와 제2항의 계약해제․해지는 “이용자”가 전화,
              전자우편 또는 모사전송으로 “회사”에 그 의사를 표시한 때에 효력이
              발생합니다.
            </>
            <>
              “회사”는 제3항에 따라 “이용자”가 표시한 청약철회 또는
              계약해제․해지의 의사표시를 수신한 후 지체 없이 이러한 사실을
              “이용자”에게 회신합니다.
            </>
            <>
              “이용자”는 제2항의 사유로 계약해제․해지의 의사표시를 하기 전에
              상당한 기간을 정하여 완전한 “콘텐츠” 혹은 서비스이용의 하자에 대한
              치유를 요구할 수 있습니다.
            </>
          </HangList>
        </Jo>
        <Jo index={27} title="“이용자”의 청약철회와 계약해제․해지의 효과">
          <HangList>
            <>
              “회사”는 “이용자”가 청약철회의 의사표시를 한 날로부터 또는
              “이용자”에게 계약해제․해지의 의사표시에 대하여 회신한 날로부터
              3영업일 이내에 대금의 결제와 동일한 방법으로 이를 환급하여야 하며,
              동일한 방법으로 환불이 불가능할 때에는 이를 사전에 고지하여야
              합니다. 이 경우 “회사”가 “이용자”에게 환급을 지연한 때에는 그
              지연기간에 대하여 공정거래위원회가 정하여 고시하는 지연이자율을
              곱하여 산정한 지연이자를 지급합니다.
            </>
            <>
              “회사”가 제1항에 따라 환급할 경우에 “이용자”가 서비스이용으로부터
              얻은 이익에 해당하는 금액을 공제하고 환급할 수 있습니다.
            </>
            <>
              “회사”는 위 대금을 환급함에 있어서 “이용자”가 신용카드 또는
              전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체
              없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의
              청구를 정지 또는 취소하도록 요청합니다. 다만, 제2항의 금액공제가
              필요한 경우에는 그러하지 아니할 수 있습니다.
            </>
            <>
              “회사”, “콘텐츠 등의 대금을 지급 받은 자” 또는 “이용자와
              콘텐츠이용계약을 체결한 자“가 동일인이 아닌 경우에 각자는 청약철회
              또는 계약해제․해지로 인한 대금환급과 관련한 의무의 이행에 있어서
              연대하여 책임을 집니다.
            </>
            <>
              “회사”는 “이용자”에게 청약철회를 이유로 위약금 또는 손해배상을
              청구하지 않습니다. 그러나 “이용자”의 계약해제․해지는 손해배상의
              청구에 영향을 미치지 않습니다.
            </>
          </HangList>
        </Jo>
        <Jo index={28} title="회사의 계약해제․해지 및 이용제한">
          <HangList>
            <>
              “회사”는 “이용자”가 제12조 제2항에서 정한 행위를 하였을 경우
              사전통지 없이 계약을 해제․해지하거나 또는 기간을 정하여
              서비스이용을 제한할 수 있습니다.
            </>
            <>
              제1항의 해제․해지는 “회사”가 자신이 정한 통지방법에 따라
              “이용자”에게 그 의사를 표시한 때에 효력이 발생합니다.
            </>
            <>
              “회사”의 해제․해지 및 이용제한에 대하여 “이용자”는 “회사”가 정한
              절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고
              “회사”가 인정하는 경우, “회사”는 즉시 서비스의 이용을 재개합니다.
            </>
          </HangList>
        </Jo>
        <Jo index={29} title="회사의 계약해제․해지의 효과">
          “이용자”의 귀책사유에 따른 이용계약의 해제․해지의 효과는 제27조를
          준용합니다. 다만, “회사”는 “이용자”에 대하여 계약해제․해지의
          의사표시를 한 날로부터 7영업일 이내에 대금의 결제와 동일한 방법으로
          이를 환급합니다.
        </Jo>
      </Jang>
      <Jang index={5} title="환불,과오금, 피해보상 등">
        <Jo index={30} title="환불">
          <HangList>
            <>
              회원은 회사에 환불을 요구할 수 있습니다. 환불은 회사가 안내하는
              정책 및 방법에 따라 진행됩니다.
            </>
            <>
              회사는 다음 각 호의 방식으로 환불을 진행합니다.
              <HoList>
                <>
                  포인트 환불: 구매하신 포인트는 사용하기 전까지 영구적으로
                  유지됩니다. 해당 포인트는 구매 후 1개월 이내에 전액 환불
                  가능하며, 1개월 이후엔 60%만 환불 가능합니다. 자막 제작에
                  사용되어 소모된 포인트는 기간 관계없이 환불이 불가능합니다.
                </>
                <>
                  연간 결제 회원: 연 기준은 12개월이고 잔여 이용료는 전체
                  연간결제 이용료를 12로 나누고 이용한 하루라도 이용한 월을
                  제외하고 남은 금액을 환불합니다.
                </>
              </HoList>
            </>
            <>
              본 조의 환불 금액 기준은 연간 결제 회원이라 하더라도 정기결제
              금액으로 계산 후 진행됩니다. 따라서 환불 시점에 따라 환불 금액이
              존재하지 않는 경우도 있을 수 있습니다.
            </>
          </HangList>
        </Jo>
        <Jo index={31} title="과오금">
          <HangList>
            <>
              “회사”는 과오금이 발생한 경우 이용대금의 결제와 동일한 방법으로
              과오금 전액을 환불하여야 합니다. 다만, 동일한 방법으로 환불이
              불가능할 때는 이를 사전에 고지합니다.
            </>
            <>
              “회사”의 책임 있는 사유로 과오금이 발생한 경우 “회사”는 계약비용,
              수수료 등에 관계없이 과오금 전액을 환불합니다. 다만, “이용자”의
              책임 있는 사유로 과오금이 발생한 경우, “회사”가 과오금을 환불하는
              데 소요되는 비용은 합리적인 범위 내에서 “이용자”가 부담하여야
              합니다.
            </>
            <>
              회사는 “이용자”가 주장하는 과오금에 대해 환불을 거부할 경우에
              정당하게 이용대금이 부과되었음을 입증할 책임을 집니다.
            </>
            <>
              “회사”는 과오금의 환불절차를 디지털콘텐츠이용자보호지침에 따라
              처리합니다.
            </>
          </HangList>
        </Jo>
        <Jo index={32} title="콘텐츠하자 등에 의한 이용자피해보상">
          “회사”는 콘텐츠하자 등에 의한 이용자피해보상의 기준․범위․방법 및
          절차에 관한 사항을 디지털콘텐츠이용자보호지침에 따라 처리합니다.
        </Jo>
        <Jo index={33} title="면책조항">
          <HangList>
            <>
              “회사”는 천재지변 또는 이에 준하는 불가항력으로 인하여 “콘텐츠”를
              제공할 수 없는 경우에는 “콘텐츠” 제공에 관한 책임이 면제됩니다.
            </>
            <>
              “회사”는 “이용자”의 귀책사유로 인한 콘텐츠이용의 장애에 대하여는
              책임을 지지 않습니다.
            </>
            <>
              “회사”는 “회원”이 “콘텐츠”와 관련하여 게재한 정보, 자료, 사실의
              신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.
            </>
            <>
              “회사”는 “이용자” 상호간 또는 “이용자”와 제3자 간에 “콘텐츠”를
              매개로 하여 발생한 분쟁 등에 대하여 책임을 지지 않습니다.
            </>
          </HangList>
        </Jo>
        <Jo index={34} title="분쟁의 해결">
          “회사”는 분쟁이 발생하였을 경우에 “이용자”가 제기하는 정당한 의견이나
          불만을 반영하여 적절하고 신속한 조치를 취합니다. 다만, 신속한 처리가
          곤란한 경우에 “회사”는 “이용자”에게 그 사유와 처리일정을 통보합니다.
        </Jo>
      </Jang>
    </List>
  );
}

Terms.options = { auth: false } as PageOptions;
