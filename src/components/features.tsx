import {
  Container,
  Box,
  Text,
  Heading,
  Wrap,
  WrapItem,
  Stack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Image, { StaticImageData } from "next/image";
import Custom from "../../public/assets/customize.png";
import Montage from "../../public/assets/montage.png";
import Extension from "../../public/assets/extension.png";
import InViewProvider from "./inviewProvider";

interface IFeature {
  heading: string;
  content: string;
  src: StaticImageData;
}

export default function Features() {
  const { t } = useTranslation("landing");
  const features: IFeature[] = [
    {
      heading: t("landing_features_first"),
      content: t("landing_features_first_ex"),
      src: Custom,
    },
    {
      heading: t("landing_features_second"),
      content: t("landing_features_second_ex"),
      src: Montage,
    },
    {
      heading: t("landing_features_fourth"),
      content: t("landing_features_fourth_ex"),
      src: Extension,
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
      <Wrap
        placeItems="center"
        spacing={16}
        mt={12}
        mb={4}
        justify="space-evenly"
        overflow="visible"
      >
        {features.map((feature) => (
          <WrapItem
            key={feature.heading}
            textAlign="center"
            mt={{ base: "0px", md: "40px" }}
            overflow="visible"
          >
            <InViewProvider whileHover={1.05} initialScale={0.95}>
              <Stack alignItems="center">
                <Box w="100px" h="100px">
                  <Image src={feature.src} alt="feature_image" />
                </Box>
                <Heading
                  fontWeight="semibold"
                  fontSize={{ base: "25px", md: "30px" }}
                  wordBreak="keep-all"
                >
                  {feature.heading}
                </Heading>
                <Text fontSize="md" wordBreak="keep-all" maxW="500px">
                  {feature.content}
                </Text>
              </Stack>
            </InViewProvider>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
}
