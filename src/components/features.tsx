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

export default function Features() {
  const { t } = useTranslation("landing");
  const features: IFeature[] = [
    {
      heading: t("landing_features_first"),
      content: t("landing_features_first_ex"),
      icon: MdOutlineFlashlightOn,
    },
    {
      heading: t("landing_features_second"),
      content: t("landing_features_second_ex"),
      icon: SiMinds,
    },
    {
      heading: t("landing_features_third"),
      content: t("landing_features_third_ex"),
      icon: MdPermDeviceInformation,
    },
    {
      heading: t("landing_features_fourth"),
      content: t("landing_features_fourth_ex"),
      icon: MdOutlinePersonPin,
    },
  ];
  return (
    <Container maxW="6xl" p="120px 20px 50px 20px">
      <Heading
        fontSize={{ base: "35px", md: "5xl", lg: "6xl" }}
        fontWeight="bold"
        mb={3}
        textAlign="center"
      >
        {t("landing_features")}
      </Heading>
      <Text
        textAlign="center"
        fontSize={{ base: "18px", md: "2xl" }}
        wordBreak="keep-all"
      >
        {t("tools")}
      </Text>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        placeItems="center"
        spacing={16}
        mt={12}
        mb={4}
      >
        {features.map((feature) => (
          <Box
            key={feature.heading}
            textAlign="center"
            mt={{ base: "0px", md: "40px" }}
          >
            <Icon as={feature.icon} w="60px" h="60px" color="blue.400" />
            <Heading fontWeight="semibold" fontSize="2xl">
              {feature.heading}
            </Heading>
            <Text fontSize="md" wordBreak="keep-all">
              {feature.content}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
