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
      <Jo
        index={7}
        title="개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한
        사항"
      >
        <HangList>
          <>
            영인치랩 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해
            이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
          </>
          <>
            쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
            브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의
            하드디스크에 저장되기도 합니다. 가. 쿠키의 사용 목적 : 이용자가
            방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어,
            보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해
            사용됩니다. 나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의
            도구]인터넷 옵션]개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부
            할 수 있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에
            어려움이 발생할 수 있습니다.
          </>
        </HangList>
      </Jo>
      <Jo index={8} title="행태정보의 수집·이용·제공 및 거부 등에 관한 사항">
        <HangList>
          <>
            [개인정보처리자]은(는) 서비스 이용과정에서 정보주체에게 최적화된
            맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여
            행태정보를 수집·이용하고 있습니다.
          </>
          <>
            [개인정보처리자]은(는) 다음과 같이 행태정보를 수집합니다. 수집하는
            행태정보의 항목 행태정보 수집 방법 행태정보 수집 목적 보유·이용기간
            및 이후 정보처리 방법 이용자의 웹사이트/앱 서비스 방문이력,
            검색이력, 구매이력 이용자의 웹 사이트 및 앱방문 / 실행시 자동 수집
            이용자의 관심, 성햐에 기반한 개인 맞춤형 광고를 제공 3년 이후 파기
            [온라인 맞춤형 광고 등을 위해 제3자(온라인 광고사업자 등)가 이용자의
            행태정보를 수집·처리할수 있도록 허용한 경우]
          </>
          <>
            [개인정보처리자]은(는) 다음과 같이 온라인 맞춤형 광고 사업자가
            행태정보를 수집·처리하도록 허용하고 있습니다. - 행태정보를 수집 및
            처리하려는 광고 사업자 : 영인치랩 - 행태정보 수집 방법 : 이용자가
            당사 웹사이트를 방문하거나 앱을 실행할 때 자동 수집 및 전송 -
            수집·처리되는 행태정보 항목 : 이용자의 웹/앱 방문이력, 검색이력,
            구매이력 - 보유·이용기간 : 3년
          </>
          <>
            [개인정보처리자]은(는) 온라인 맞춤형 광고 등에 필요한 최소한의
            행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력,
            기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할
            우려가 있는 민감한 행태정보를 수집하지 않습니다.
          </>
          <>
            [개인정보처리자]은(는) 만 14세 미만임을 알고 있는 아동이나 만14세
            미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고
            목적의 행태정보를 수집하지 않고, 만 14세 미만임을 알고 있는
            아동에게는 맞춤형 광고를 제공하지 않습니다.
          </>
          <>
            [개인정보처리자]은(는) 모바일 앱에서 온라인 맞춤형 광고를 위하여
            광고식별자를 수집·이용합니다. 정보주체는 모바일 단말기의 설정 변경을
            통해 앱의 맞춤형 광고를 차단·허용할 수 있습니다.
            <Text>‣ 스마트폰의 광고식별자 차단/허용</Text>
            <Text>
              (1) (안드로이드) ① 설정 → ② 개인정보보호 → ③ 광고 → ③ 광고 ID
              재설정 또는 광고ID 삭제
            </Text>
            <Text>
              (2) (아이폰) ① 설정 → ② 개인정보보호 → ③ 추적 → ④ 앱이 추적을
              요청하도록 허용 끔
            </Text>
            <Text>
              ※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.
            </Text>
          </>
          <>
            정보주체는 웹브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형
            광고를 일괄적으로 차단·허용할 수 있습니다. 다만, 쿠키 설정 변경은
            웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.
            <Text>‣ 웹브라우저를 통한 맞춤형 광고 차단/허용</Text>
            <Text>
              (1) 인터넷 익스플로러(Windows 10용 Internet Explorer 11) -
              Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택 -
              개인 정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단
              또는 허용을 선택
            </Text>
            <Text>
              (2) Microsoft Edge - Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후,
              설정을 클릭합니다. - 설정 페이지 좌측의 ‘개인정보, 검색 및
              서비스’를 클릭 후 「추적방지」 섹션에서 ‘추적방지’ 여부 및 수준을
              선택합니다. - ‘InPrivate를 검색할 때 항상 ““엄격”” 추적 방지 사용’
              여부를 선택합니다. - 아래 「개인정보」 섹션에서 ‘추적 안함
              요청보내기’ 여부를 선택합니다.
            </Text>
            <Text>
              (3) 크롬 브라우저 - Chrome에서 오른쪽 상단 ‘⋮’ 표시(chrome
              맞춤설정 및 제어)를 클릭한 후, 설정 표시를 클릭합니다. - 설정
              페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」 섹션에서
              콘텐츠 설정을 클릭합니다. - 쿠키 섹션에서 ‘타사 쿠키 및 사이트
              데이터 차단’의 체크박스를 선택합니다.
            </Text>
          </>
          <>
            정보주체는 아래의 연락처로 행태정보와 관련하여 궁금한 사항과 거부권
            행사, 피해 신고 접수 등을 문의할 수 있습니다.
            <Text>‣ 개인정보 보호</Text>
            <Text>담당부서 부서명 : 개인정보 보호 담당 팀</Text>
            <Text>담당자 : 신명진</Text>
            <Text>연락처 : hanwoolmj@younginch.com</Text>
          </>
        </HangList>
      </Jo>
      <Jo index={9} title="가명정보를 처리하는 경우 가명정보 처리에 관한 사항">
        [ 영인치랩 ] 은(는) 다음과 같은 목적으로 가명정보를 처리하고 있습니다.
        <Text>
          ▶ 가명정보의 처리 목적 - 이용자에게 더 좋은 서비스 경험을 제공하기
          위한 목적
        </Text>
        <Text>
          ▶ 가명정보의 처리 및 보유기간 - 3년 이후 자동 폐기 제13조 (개인정보
          보호책임자에 관한 사항)
        </Text>
        <HangList>
          <>
            영인치랩 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고,
            개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
            아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            <Text>▶ 개인정보 보호책임자</Text>
            <Text>성명 :신명진</Text>
            <Text>직책 :대표이사</Text>
            <Text>직급 :CEO</Text>
            <Text>연락처 :01034222418, hanwoolmj@younginch.com</Text>
            <Text>※ 개인정보 보호 담당부서로 연결됩니다.</Text>
            <Text>▶ 개인정보 보호 담당부서</Text>
            <Text>부서명 :개인정보 보호팀</Text>
            <Text>담당자 :이민규</Text>
            <Text>연락처 :01028573320, red1108@younginch.com</Text>
          </>
          <>
            정보주체께서는 영인치랩 의 서비스(또는 사업)을 이용하시면서 발생한
            모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
            개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 영인치랩
            은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
          </>
        </HangList>
      </Jo>
      <Jo index={10} title="국내대리인의 지정">
        정보주체는 ｢개인정보 보호법｣ 제39조의11에 따라 지정된 [ 영인치랩 ]의
        국내대리인에게 개인정보 관련 고충처리 등의 업무를 위하여 연락을 취할 수
        있습니다. [ 영인치랩 ]은(는) 정보주체의 개인정보 관련 고충처리 등
        개인정보 보호책임자의 업무 등을 신속하게 처리할 수 있도록
        노력하겠습니다.
        <Text>
          ▶ [ 영인치랩 ] 은(는) ｢개인정보 보호법｣ 제39조의11에 따라 국내대리인을
          지정하였습니다.
        </Text>
        <Text>- 국내대리인의 성명 : 영인치랩</Text>
        <Text>- 국내대리인의 주소 : 별내 4로 63 신일유토빌</Text>
        <Text>- 국내대리인의 전화번호 : 010-3422-2418</Text>
        <Text>- 국내대리인의 전자우편 주소 : hanwoolmj@younginch.com</Text>
        제15조(개인정보의 열람청구를 접수·처리하는 부서) 정보주체는 ｢개인정보
        보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수
        있습니다. [ 영인치랩 ]은(는) 정보주체의 개인정보 열람청구가 신속하게
        처리되도록 노력하겠습니다.
        <Text>▶ 개인정보 열람청구 접수·처리 부서</Text>
        <Text>부서명 : 개인정보 보호팀</Text>
        <Text>담당자 : 이민규</Text>
        <Text>연락처 : 01028573320, red1108@younginch.com</Text>
      </Jo>
      <Jo index={11} title="개인정보 처리방침 변경">
        <HangList>
          <>이 개인정보처리방침은 2022년 4월 27일부터 적용됩니다.</>
          <>이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.</>
        </HangList>
      </Jo>
    </List>
  );
}

Privacy.options = { auth: false } as PageOptions;
