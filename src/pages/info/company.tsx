import {
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import Layout from "../../components/layout";
import hanwoolmjPic from "../../../public/hanwoolmj.png";
import red1108Pic from "../../../public/red1108.png";
import sbohPic from "../../../public/sboh.png";
import carterkim614Pic from "../../../public/carterkim614.png";

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

const red1108Summary = [
  "경기과학고등학교 졸업",
  "서울대학교 컴퓨터공학부 재학 중 (2학년)",
  "인공지능 연구로 휴먼테크 논문대상 은상 (고등부)",
  "(주)레인보우 브레인 인턴",
];

const sbohSummary = [
  "인천과학예술영재학교 졸업",
  "카이스트 전산학부 재학 중 (2학년)",
  "카이스트 개발 자치단체 SPARCS 회장 (2021~)",
  "OTL개발, 외주 등 개발 경험 다수",
  "(주)레인보우 브레인 인턴",
];

const carterkim614Summary = ["서울대학교 경영학부 재학 중 (2학년)"];

function Profile({ name, position, summary, email, image }: Props) {
  return (
    <WrapItem>
      <Box
        h="320px"
        w="540px"
        marginY="12px"
        borderWidth="1px"
        borderRadius="12px"
        overflow="hidden"
      >
        <HStack>
          <Box
            w="180px"
            verticalAlign="stretch"
          >
            <Image
              src={image}
              alt={name}
              layout="responsive"
              objectFit="fill"
            />
          </Box>
          <Stack marginLeft="12px" verticalAlign="top">
            <Heading>{name}</Heading>
            <Text>{position}</Text>
            <Text>{email + "@younginch.com"}</Text>
            {summary.map((value, index) => {
              return <Text key={index}>{value}</Text>;
            })}
          </Stack>
        </HStack>
      </Box>
    </WrapItem>
  );
}

export default function Company() {
  return (
    <Layout>
      <Heading>사람들</Heading>
      <Wrap>
        <Profile
          name="신명진"
          position="대표"
          email="hanwoolmj"
          summary={hanwoolmjSummary}
          image={hanwoolmjPic}
        />
        <Profile
          name="이민규"
          position="대표"
          email="red1108"
          summary={red1108Summary}
          image={red1108Pic}
        />
        <Profile
          name="오승빈"
          position="개발"
          email="sboh"
          summary={sbohSummary}
          image={sbohPic}
        />
        <Profile
          name="김주현"
          position="홍보 및 마케팅"
          email="carterkim614"
          summary={carterkim614Summary}
          image={carterkim614Pic}
        />
      </Wrap>
    </Layout>
  );
}
