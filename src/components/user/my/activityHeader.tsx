import React, { useState } from "react";
import {
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  SimpleGrid,
  Container,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GrProductHunt } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { IconType } from "react-icons";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

interface StatData {
  id: number;
  label: string;
  score: number;
  icon: IconType;
  detail: string;
  href: string;
}

export default function ActivityHeader() {
  const { t } = useTranslation("privateProfile");

  const statData: StatData[] = [
    {
      id: 1,
      label: t("dashboard_head_request"),
      score: 1234,
      icon: FiSend,
      detail: "View All",
      href: "/user/my/request",
    },
    {
      id: 2,
      label: t("dashboard_head_views"),
      score: 1234,
      icon: AiOutlineEye,
      detail: "View All",
      href: "/user/my/sub",
    },
    {
      id: 3,
      label: t("dashboard_head_points"),
      score: 1234,
      icon: GrProductHunt,
      detail: "충전하기",
      href: "/buy",
    },
  ];

  return (
    <Container maxW="7xl" h="150px" maxH="150px" pl={10} pr={10} pt={5}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mb={4}>
        {statData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
export function Card({ data }: { data: StatData }) {
  const [onHover, setOnHover] = useState<boolean>(false);
  const mouseLeave = () => {
    setOnHover(false);
  };
  const mouseEnter = () => {
    setOnHover(true);
  };

  return (
    <motion.div whileHover={{ translateY: -15 }}>
      <Stack
        direction="column"
        rounded="md"
        boxShadow={useColorModeValue(
          "0 4px 6px rgba(160, 174, 192, 0.6)",
          "2px 4px 6px rgba(9, 17, 28, 0.9)"
        )}
        w="100%"
        textAlign="left"
        align="start"
        spacing={0}
        role="group"
        overflow="hidden"
        onMouseLeave={mouseLeave}
        onMouseEnter={mouseEnter}
      >
        <HStack
          py={6}
          px={5}
          spacing={4}
          bg={useColorModeValue("white", "gray.700")}
          w="100%"
        >
          <Flex
            justify="center"
            alignItems="center"
            rounded="lg"
            p={2}
            bg="green.400"
            position="relative"
            w={12}
            h={12}
            overflow="hidden"
            lineHeight={0}
            boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
          >
            <Icon
              as={data.icon}
              w={6}
              h={6}
              color="white"
              className={`${onHover ? "icon-spin" : ""}`}
            />
          </Flex>
          <VStack spacing={0} align="start" maxW="lg" h="100%">
            <Text as="h3" fontSize="md" noOfLines={2} color="gray.400">
              {data.label}
            </Text>
            <Text as="h2" fontSize="lg" fontWeight="extrabold">
              {data.score}
            </Text>
          </VStack>
        </HStack>
        <Flex
          py={3}
          px={5}
          hidden={!onHover}
          w="100%"
          bg={useColorModeValue("gray.100", "gray.600")}
        >
          <Link href={data.href}>
            <Text fontSize="md" _hover={{ textDecoration: "underline" }}>
              {data.detail}
            </Text>
          </Link>
        </Flex>
      </Stack>
    </motion.div>
  );
}
