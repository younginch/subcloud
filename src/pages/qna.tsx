import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import { PageOptions } from "../utils/types";

type QnAProps = {
  title: string;
  children: string;
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
  return (
    <>
      <Accordion>
        <QnAAccordion title="서비스는 어떻게 사용하나요?">
          (스토어 링크)확장 프로그램 스토어에서 다운받으시면 됩니다. 현재는
          Chrome, Naver Whale, Edge만 지원하고 있습니다. 곧 모바일
          어플리케이션과 Safari, Firefox도 지원할 예정입니다.
        </QnAAccordion>
        <QnAAccordion title="영상에 자막이 보이지 않아요. 어떻게 해야하나요?">
          브라우저에 확장 프로그램을 설치했는지 먼저 확인해주세요. 만약
          설치했는데도 자막이 보이지 않다면, 해당 영상에 아직 자막이 없는 것이니
          [자막 요청]을 이용해 주시면 됩니다. 자막이 있는데도 보이지 않다면
          새로고침을 해보세요. 오류가 계속된다면 채팅을 통해 자유롭게
          문의해주세요.
        </QnAAccordion>
        <QnAAccordion title="자막은 어떻게 업로드하나요?">
          웹사이트의 [자막 제작]항목을 이용하시거나, 확장프로그램을 사용하신다면
          올리고 싶은 영상을 띄워놓은 상태에서 업로드 해주시면 됩니다.
          자막파일을 선택해도 서버에 바로 전송되지 않는다는 점을 확인해주세요.
          파일을 선택한 뒤 미리보기를 통해 충분히 검토하신 후, [전송] 버튼을
          눌러야 서버에 전송됩니다. 업로드된 자막은 SubCloud가 검토한 후 모두가
          볼 수 있게 됩니다.
        </QnAAccordion>
        <QnAAccordion title="제가 업로드한 자막이 왜 바로 보이지 않나요?">
          SubCloud는 양질의 자막을 제공하기 위헤 모든 자막을 검토한 후 등록하고
          있습니다. 업로드한 자막은 [ 프로필 &gt; 영상 자막 ]에서 검토의
          진행도를 확인하실 수 있습니다. 자막은 승인과 동시에 모두에게
          공개됩니다. 자막이 반려되었다면 재업로드시 자동으로 재검토됩니다.
        </QnAAccordion>
        <QnAAccordion title="법적 문제는 없나요?">
          국내 저작권법 제 102조에 따라 SubCloud는 저작물을 보호하기 위한
          표준적인 기술조치를 이행하고 있습니다. 다만, 저작권 침해 자료를 유통한
          경우 경고 없이 자료가 삭제될 수 있음을 유의 바랍니다.
        </QnAAccordion>
        <QnAAccordion title="포인트가 무엇인가요?">
          포인트는 SubCloud 내에서 자막을 요청할 때 필요하고, 자막을 제작할 때
          받는 재화입니다. 유료로 구매하실 수 있으며, 현금으로 교환하여 출금하실
          수 있습니다. 프리미엄 유저라면 달마다 무료로 일정량을 지급해드리고
          있습니다.
        </QnAAccordion>
      </Accordion>
    </>
  );
}

QnaPage.options = { auth: false } as PageOptions;
