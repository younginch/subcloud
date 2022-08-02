import { Stack, Text } from "@chakra-ui/react";

export default function VideoCard() {
  return (
    <Stack w="250px" h="300px" bg="red.400">
      <Text>썸네일</Text>
      <Text>제목</Text>
      <Text>채널명</Text>
      <Text>언어</Text>
      <Text>
        완성된 경우 조회수, 거절인 경우 사유, 이외경우의 경우 완성된 경우의 예상
        수익
      </Text>
      <Text>편집하기 버튼</Text>
      <Text>Status</Text>
    </Stack>
  );
}
