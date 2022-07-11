import {
  Container,
  Box,
  Text,
  Icon,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import {
  MdOutlinePersonPin,
  MdPermDeviceInformation,
  MdOutlineFlashlightOn,
} from "react-icons/md";
import { SiMinds } from "react-icons/si";
import { IconType } from "react-icons";
import useTranslation from "next-translate/useTranslation";

interface IFeature {
  heading: string;
  content: string;
  icon: IconType;
}

const features: IFeature[] = [
  {
    heading: "영상 위에서 그대로 재생",
    content:
      "The main part of the learning process is using flashcards, you see a question, then you answer it.",
    icon: MdOutlineFlashlightOn,
  },
  {
    heading: "Never forget",
    content: `With our latest SRS algorithm, you will never forget what you've learned. The more you remember something, the less often the system will ask you to review it.`,
    icon: SiMinds,
  },
  {
    heading: "Tiny bits of information",
    content:
      "Instead of showing you a wall of text that will take you a long time to read and then that you quickly forget, we show you tiny bits of information every day.",
    icon: MdPermDeviceInformation,
  },
  {
    heading: "Community",
    content: `Keep your learning streak going, see stats of what you've learned and share it with others via your public profile. You can also join our private discord server!`,
    icon: MdOutlinePersonPin,
  },
];

export default function Features() {
  const { t } = useTranslation("landing");
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <Heading
        fontSize={{ base: "35px", md: "5xl", lg: "6xl" }}
        fontWeight="bold"
        mb={3}
        textAlign="center"
      >
        {t("landing_features")}
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        placeItems="center"
        spacing={16}
        mt={12}
        mb={4}
      >
        {features.map((feature, index) => (
          <Box key={index} textAlign="center" mt={{ base: "0px", md: "40px" }}>
            <Icon as={feature.icon} w="60px" h="60px" color="blue.400" />
            <Heading fontWeight="semibold" fontSize="2xl">
              {feature.heading}
            </Heading>
            <Text fontSize="md">{feature.content}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
