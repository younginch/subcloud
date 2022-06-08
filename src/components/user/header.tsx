// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

type Tabs = {
  name: string;
  router: string;
  icon: ReactNode;
};

type Props = {
  backgroundHeader: string;
  backgroundProfile: string;
  avatarImage?: string;
  name?: string;
  email?: string;
  tabs: Array<Tabs>;
};

const Header = ({
  backgroundHeader,
  backgroundProfile,
  avatarImage,
  name,
  email,
  tabs,
}: Props) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.1)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const tabTextSize = { base: "xs", md: "12px", lg: "15px" };
  return (
    <Box
      mb={{ base: "205px", md: "75px", xl: "70px" }}
      ml={{ base: "5px", md: "10px", xl: "15px" }}
      mr={{ base: "5px", md: "10px", xl: "15px" }}
      borderRadius="15px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgImage="url('https://demos.creative-tim.com/purity-ui-dashboard/static/media/ProfileBackground.4dc796b0.png')"
        w="100%"
        h="300px"
        borderRadius="25px"
        bgPosition="50%"
        bgRepeat="no-repeat"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          mx="1.5rem"
          maxH="330px"
          w={{ base: "90%", xl: "95%" }}
          justifyContent={{ base: "center", md: "space-between" }}
          align="center"
          backdropFilter="saturate(200%) blur(50px)"
          position="absolute"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
          border="2px solid"
          borderColor={borderProfileColor}
          bg={backgroundProfile}
          p="24px"
          borderRadius="20px"
          transform={{
            base: "translateY(45%)",
            md: "translateY(110%)",
            lg: "translateY(160%)",
          }}
        >
          <Flex
            align="center"
            mb={{ base: "10px", md: "0px" }}
            direction={{ base: "column", md: "row" }}
            w={{ base: "100%" }}
            textAlign={{ base: "center", md: "start" }}
          >
            <Avatar
              me={{ md: "22px" }}
              src={avatarImage}
              w="80px"
              h="80px"
              borderRadius="15px"
            />
            <Flex direction="column" maxWidth="100%" my={{ base: "14px" }}>
              <Text
                fontSize={{ base: "lg", lg: "xl" }}
                color={textColor}
                fontWeight="bold"
                ms={{ base: "8px", md: "0px" }}
              >
                {name}
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={emailColor}
                fontWeight="semibold"
              >
                {email}
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction={{ base: "column", lg: "row" }}
            w={{ base: "100%", md: "50%", lg: "auto" }}
          >
            <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
              <Flex
                align="center"
                w={{ base: "100%", lg: "135px" }}
                bg="hsla(0,0%,100%,.3)"
                borderRadius="15px"
                justifyContent="center"
                py="10px"
                boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
                border="1px solid gray.200"
                cursor="pointer"
              >
                {tabs[0].icon}
                <Text
                  fontSize={tabTextSize}
                  color={textColor}
                  fontWeight="bold"
                  ms="6px"
                >
                  {tabs[0].name}
                </Text>
              </Flex>
            </Button>
            <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
              <Flex
                align="center"
                w={{ lg: "135px" }}
                borderRadius="15px"
                justifyContent="center"
                py="10px"
                mx={{ lg: "1rem" }}
                cursor="pointer"
              >
                {tabs[1].icon}
                <Text
                  fontSize={tabTextSize}
                  color={textColor}
                  fontWeight="bold"
                  ms="6px"
                >
                  {tabs[1].name}
                </Text>
              </Flex>
            </Button>
            <Link href={tabs[2].router}>
              <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                <Flex
                  align="center"
                  w={{ lg: "135px" }}
                  borderRadius="15px"
                  justifyContent="center"
                  py="10px"
                  cursor="pointer"
                >
                  {tabs[2].icon}
                  <Text
                    fontSize={tabTextSize}
                    color={textColor}
                    fontWeight="bold"
                    ms="6px"
                  >
                    {tabs[2].name}
                  </Text>
                </Flex>
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
