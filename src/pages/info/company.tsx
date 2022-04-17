import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import Layout from "../../components/layout";
import hanwoolmjPic from "../../../public/hanwoolmj.png";
import sbohPic from "../../../public/sboh.png";

type Props = {
  name: string;
  position: string;
  email: string;
  summary: string[];
  image: StaticImageData;
};

const hanwoolmjSummary = [
  "경기과학고등학교 졸업",
  "카이스트 전산학부 재학 중 ( 총장 장학생, 2학년 )",
  "KAIST NMSL 연구실 인턴",
  "서울대 수학연구소 연구원",
];

const sbohSummary = [
  "인천과학예술영재학교 졸업",
  "카이스트 전산학부 재학 중 (2학년)",
  "카이스트 개발 자치단체 SPARCS 회장 (2021~)",
  "OTL개발, 외주 등 개발 경험 다수",
  "(주)레인보우 브레인 인턴",
];

function Profile({ name, position, summary, email, image }: Props) {
  return (
    <Box maxH="640px">
      <HStack>
        <Box w="30vw" h="100%">
          <Image src={image} alt={name} layout="responsive" />
        </Box>
        <Stack>
          <Heading>{name}</Heading>
          <Text>{position}</Text>
          <Text>{email + "@younginch.com"}</Text>
          {summary.map((value, index) => {
            return <Text key={index}>{value}</Text>;
          })}
        </Stack>
      </HStack>
    </Box>
  );
}

export default function Company() {
  return (
    <Layout>
      <Heading>안녕하세요, 주식회사 영인치랩 입니다</Heading>
      <Profile
        name="신명진"
        position="대표"
        email="hanwoolmj"
        summary={hanwoolmjSummary}
        image={hanwoolmjPic}
      />
      <Profile
        name="오승빈"
        position="개발"
        email="sboh"
        summary={sbohSummary}
        image={sbohPic}
      />
    </Layout>
  );
}
