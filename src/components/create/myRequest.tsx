import { WrapItem, Stack, Wrap, Text } from "@chakra-ui/react";
import Pagination from "../pagination";
import RequestCard, { RequestStatus } from "../requestCard";

export default function MyRequest() {
  return (
    <Stack p={{ base: 5, lg: 10 }} spacing={10}>
      <Text fontWeight="bold" fontSize={{ base: "25px", md: "30px" }}>
        내가 SubCloud에 요청한 영상
      </Text>
      <Wrap
        spacing={5}
        justify={{ base: "space-evenly", md: "normal" }}
        w="fit-content"
      >
        <WrapItem>
          <RequestCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            requestLang="한국어"
            requestStatus={RequestStatus.Uploaded}
          />
        </WrapItem>
        <WrapItem>
          <RequestCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            requestLang="한국어"
            requestStatus={RequestStatus.Uploaded}
          />
        </WrapItem>
        <WrapItem>
          <RequestCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            requestLang="한국어"
            requestStatus={RequestStatus.Uploaded}
          />
        </WrapItem>
        <WrapItem>
          <RequestCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            requestLang="한국어"
            requestStatus={RequestStatus.Waiting}
          />
        </WrapItem>
        <WrapItem>
          <RequestCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            requestLang="한국어"
            requestStatus={RequestStatus.Waiting}
          />
        </WrapItem>
        <WrapItem>
          <RequestCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            requestLang="한국어"
            requestStatus={RequestStatus.Waiting}
          />
        </WrapItem>
        <WrapItem>
          <RequestCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            requestLang="한국어"
            requestStatus={RequestStatus.Uploaded}
          />
        </WrapItem>
        <WrapItem>
          <RequestCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            requestLang="한국어"
            requestStatus={RequestStatus.Uploaded}
          />
        </WrapItem>
      </Wrap>
      <Pagination />
    </Stack>
  );
}
