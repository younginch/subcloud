/* eslint-disable react/jsx-no-useless-fragment */
import { ListItem, UnorderedList, Text, List } from "@chakra-ui/react";
import { HoList, HangList, Jo } from "../../components/list";
import { PageOptions } from "../../utils/types";

export default function Privacy() {
  return (
    <List>
      <Text>
        [ 영인치랩 ](“younginch.com”이하 “영인치”)은(는) 「개인정보 보호법」
        제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고
        원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을
        수립·공개합니다.
      </Text>
      <UnorderedList>
        <ListItem>이 개인정보처리방침은 2022년 4월 27부터 적용됩니다.</ListItem>
      </UnorderedList>
      <Jo index={1} title="개인정보의 처리 목적">
        <Text>
          [ 영인치랩 ](“younginch.com”이하 “영인치”)은(는) 다음의 목적을 위하여
          개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
          용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보
          보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
          예정입니다.
        </Text>
        <HoList>
          <>
            홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공에
            따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종
            고지·통지 목적으로 개인정보를 처리합니다.
          </>
          <>
            민원사무 처리 민원인의 신원 확인, 민원사항 확인, 처리결과 통보
            목적으로 개인정보를 처리합니다.
          </>
          <>
            재화 또는 서비스 제공 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공,
            본인인증을 목적으로 개인정보를 처리합니다.
          </>
          <>
            마케팅 및 광고에의 활용 신규 서비스(제품) 개발 및 맞춤 서비스 제공,
            이벤트 및 광고성 정보 제공 및 참여기회 제공 , 접속빈도 파악 또는
            회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
          </>
        </HoList>
      </Jo>
      <Jo index={2} title="개인정보의 처리 및 보유 기간">
        <>
          [ 영인치랩 ]은(는) 법령에 따른 개인정보 보유·이용기간 또는
          정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간
          내에서 개인정보를 처리·보유합니다.
        </>
        <>
          각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
          <HoList>
            <>
              [홈페이지 회원가입 및 관리] [홈페이지 회원가입 및 관리]와 관련한
              개인정보는 수집.이용에 관한 동의일로부터[3년]까지 위 이용목적을
              위하여 보유.이용됩니다. 보유근거 : 회원 식별을 위해 회원가입 및
              관리에 대한 정보를 보유함 관련법령 : 신용정보의 수집/처리 및 이용
              등에 관한 기록 : 3년 예외사유 :
            </>
            <>
              [민원사무 처리] [민원사무 처리]와 관련한 개인정보는 수집.이용에
              관한 동의일로부터[3년]까지 위 이용목적을 위하여 보유.이용됩니다.
              보유근거 : 소비자의 민원 사항을 효율적으로 해결하기 위해 보유함
              관련법령 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 예외사유
              :
            </>
            <>
              [재화 또는 서비스 제공] [재화 또는 서비스 제공]와 관련한
              개인정보는 수집.이용에 관한 동의일로부터[3년]까지 위 이용목적을
              위하여 보유.이용됩니다. 보유근거 : 회원에 따라 제공하는 서비스가
              달라지므로 회원의 정보를 저장하여 더 좋은 서비스를 제공하고자 함
              관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년
              예외사유 :
            </>
            <>
              [마케팅 및 광고에의 활용] [마케팅 및 광고에의 활용]와 관련한
              개인정보는 수집.이용에 관한 동의일로부터[3년]까지 위 이용목적을
              위하여 보유.이용됩니다. 보유근거 : 회원에게 더 알맞는 서비스를
              제공하기 위해 정보를 보유함 관련법령 : 신용정보의 수집/처리 및
              이용 등에 관한 기록 : 3년 예외사유 :
            </>
          </HoList>
        </>
      </Jo>
      <Jo index={3} title="처리하는 개인정보의 항목">
        <HangList>
          [ 영인치랩 ]은(는) 다음의 개인정보 항목을 처리하고 있습니다.
        </HangList>
        <HoList>
          <>
            [ 홈페이지 회원가입 및 관리 ] 필수항목 : 이메일, 비밀번호, 로그인ID,
            이름, 쿠키 선택항목 : 휴대전화번호, 비밀번호 질문과 답, 성별,
            생년월일, 신용카드정보, 은행계좌정보
          </>
          <>
            [ 재화 또는 서비스 제공 ] 필수항목 : 이메일, 로그인ID, 이름, 서비스
            이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록 선택항목 :
            신용카드정보, 은행계좌정보
          </>
        </HoList>
      </Jo>
      <Jo index={4} title="개인정보의 파기절차 및 파기방법">
        <HangList>
          <>
            [ 영인치랩 ] 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등
            개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
            파기합니다.
          </>
          <>
            정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
            달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야
            하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나
            보관장소를 달리하여 보존합니다.
            <HoList>
              <>법령 근거 :</>
              <>보존하는 개인정보 항목 : 계좌정보, 거래날짜</>
            </HoList>
          </>
          <>
            개인정보 파기의 절차 및 방법은 다음과 같습니다.
            <HoList>
              <>
                파기절차 [ 영인치랩 ] 은(는) 파기 사유가 발생한 개인정보를
                선정하고, [ 영인치랩 ] 의 개인정보 보호책임자의 승인을 받아
                개인정보를 파기합니다.
              </>
              <>
                파기방법 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적
                방법을 사용합니다.
              </>
            </HoList>
          </>
        </HangList>
      </Jo>
      <Jo
        index={5}
        title="정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항"
      >
        <HangList>
          <>
            정보주체는 영인치랩에 대해 언제든지 개인정보 열람·정정·삭제·처리정지
            요구 등의 권리를 행사할 수 있습니다.
          </>
          <>
            제1항에 따른 권리 행사는영인치랩에 대해 「개인정보 보호법」 시행령
            제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실
            수 있으며 영인치랩은(는) 이에 대해 지체 없이 조치하겠습니다.
          </>
          <>
            제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등
            대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한
            고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야
            합니다.
          </>
          <>
            개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항,
            제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
          </>
          <>
            개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
            대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
          </>
          <>
            영인치랩은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구,
            처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한
            대리인인지를 확인합니다.
          </>
        </HangList>
      </Jo>
      <Jo index={6} title="개인정보의 안전성 확보조치에 관한 사항">
        [ 영인치랩 ]은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를
        취하고 있습니다.
        <HoList>
          <>
            정기적인 자체 감사 실시 개인정보 취급 관련 안정성 확보를 위해
            정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.
          </>
          <>
            개인정보 취급 직원의 최소화 및 교육 개인정보를 취급하는 직원을
            지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을
            시행하고 있습니다.
          </>
          <>
            내부관리계획의 수립 및 시행 개인정보의 안전한 처리를 위하여
            내부관리계획을 수립하고 시행하고 있습니다.
          </>
          <>
            해킹 등에 대비한 기술적 대책 [영인치랩](“영인치”)은 해킹이나 컴퓨터
            바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여
            보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이
            통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고
            있습니다.
          </>
          <>
            개인정보의 암호화 이용자의 개인정보는 비밀번호는 암호화 되어 저장 및
            관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
            데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도
            보안기능을 사용하고 있습니다.
          </>
          <>
            접속기록의 보관 및 위변조 방지 개인정보처리시스템에 접속한 기록을
            최소 1년 이상 보관, 관리하고 있으며,다만, 5만명 이상의 정보주체에
            관하여 개인정보를 추가하거나, 고유식별정보 또는 민감정보를 처리하는
            경우에는 2년이상 보관, 관리하고 있습니다. 또한, 접속기록이 위변조 및
            도난, 분실되지 않도록 보안기능을 사용하고 있습니다.
          </>
          <>
            개인정보에 대한 접근 제한 개인정보를 처리하는 데이터베이스시스템에
            대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를
            위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여
            외부로부터의 무단 접근을 통제하고 있습니다.
          </>
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
