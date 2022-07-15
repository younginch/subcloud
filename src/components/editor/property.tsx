import { Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { EditorContext } from "../../pages/editor";

export default function Property() {
  const { contents, focusedIndex } = useContext(EditorContext);

  if (contents[focusedIndex] === undefined) {
    return <>선택된 부분이 없습니다.</>;
  }

  const duration =
    (contents[focusedIndex].endTime - contents[focusedIndex].startTime) / 1000;
  const wordCount = contents[focusedIndex].toText().length;

  const errors = [];
  if (duration < 0.7) {
    errors.push("Duration is too short.");
  }
  if (wordCount / duration > 20) {
    errors.push("Reading rate shouldn't exceed 21 characters / sec.");
  }

  return (
    <Stack>
      <Text>{`지속 시간: ${duration}초`}</Text>
      <Text>{`글자 수: ${wordCount}자`}</Text>
      <Text>{`글자수/초: ${(wordCount / duration).toFixed(3)}`}</Text>
      {errors === [] ? (
        <Text color="green">경고 없음</Text>
      ) : (
        <Text color="red">{errors.join("\n")}</Text>
      )}
    </Stack>
  );
}
