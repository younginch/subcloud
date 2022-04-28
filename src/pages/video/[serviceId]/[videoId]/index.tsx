import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Heading,
  HStack,
  Image,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Video() {
  const router = useRouter();

  return (
    <>
      <HStack>
        <Image
          w="360px"
          marginEnd="24px"
          src={`https://img.youtube.com/vi/${router.query.videoId}/maxresdefault.jpg`}
          alt="Video thumbnail"
        />
        <Stack>
          <Heading size="lg">
            오마이걸 - 신호등 [유희열의 스케치북/You Heeyeol’s Sketchbook] | KBS
            220401 방송
          </Heading>
          <Text>조회수 529,975회 | 2022. 4. 2.</Text>
          <div style={{ height: "12px" }} />
          <HStack>
            <Avatar
              marginEnd="12px"
              src="https://yt3.ggpht.com/6xOBiHC0rSAa74kQ8MLBDW_sYN0KRCebJGlGODREsjypB9zOEx63TXR1oSslLLe9ptDIAcjV6Q=s176-c-k-c0x00ffffff-no-rj"
            />
            <Stack>
              <Heading size="md">KBS Kpop</Heading>
              <Text>구독자 686만명</Text>
            </Stack>
          </HStack>
        </Stack>
      </HStack>
      <HStack marginTop="32px">
        <Stack flex={1} verticalAlign="stretch">
          <Heading size="lg">요청 목록</Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>언어</Th>
                  <Th>요청 수</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>English (English)</Td>
                  <Td isNumeric>3048</Td>
                </Tr>
                <Tr>
                  <Td>Japanese (日本語)</Td>
                  <Td isNumeric>914</Td>
                </Tr>
                <Tr>
                  <Td>Korean (한국어)</Td>
                  <Td isNumeric>254</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <div style={{ height: "40px" }} />
        </Stack>
        <Stack w="24px" />
        <Stack flex={2} verticalAlign="stretch">
          <Heading size="lg">자막 목록</Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>언어</Th>
                  <Th>제작자</Th>
                  <Th>평점</Th>
                  <Th>조회수</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>English (English)</Td>
                  <Td>Platypus</Td>
                  <Td>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < 5 ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Td>
                  <Td isNumeric>2356</Td>
                </Tr>
                <Tr>
                  <Td>English (English)</Td>
                  <Td>Godthinkun</Td>
                  <Td>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < 3 ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Td>
                  <Td isNumeric>74</Td>
                </Tr>
                <Tr>
                  <Td>Japanese (日本語)</Td>
                  <Td>Insense</Td>
                  <Td>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < 5 ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Td>
                  <Td isNumeric>789</Td>
                </Tr>
                <Tr>
                  <Td>Korean (한국어)</Td>
                  <Td>Platypus</Td>
                  <Td>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < 4 ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Td>
                  <Td isNumeric>193</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </HStack>
    </>
  );
}
