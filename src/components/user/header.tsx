import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef } from "react";
import { PublicProfileTab } from "../../utils/enums";

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
  currentTab: PublicProfileTab;
  tabs: Array<Tabs>;
};

function Header({
  backgroundHeader,
  backgroundProfile,
  avatarImage,
  name,
  email,
  currentTab,
  tabs,
}: Props) {
  const router = useRouter();
  const textColor = useColorModeValue("gray.700", "white");
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const tabTextSize = { base: "xs", md: "12px", lg: "15px" };
  const headerMargin = { base: "5px", md: "10px", xl: "15px" };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Box
      m={headerMargin}
      mb={{ base: "155px", md: "75px", xl: "70px" }}
      borderRadius="15px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgImage={backgroundHeader}
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
          backdropFilter="saturate(200%) blur(70px)"
          position="absolute"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
          bg={backgroundProfile}
          p="24px"
          borderRadius="20px"
          transform={{
            base: "translateY(20%)",
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
            position="relative"
          >
            <Box position="absolute" top="-84px" ref={ref} w={0} h={0} />
            <Avatar
              me={{ md: "22px" }}
              src={avatarImage}
              w="80px"
              h="80px"
              borderRadius="15px"
            />
            <Flex direction="column" maxWidth="100%" my={{ base: "14px" }}>
              <HStack>
                <Text
                  fontSize={{ base: "lg", lg: "xl" }}
                  color={textColor}
                  fontWeight="bold"
                  ms={{ base: "8px", md: "0px" }}
                >
                  {name}
                </Text>
              </HStack>
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
            {tabs.map((tab, index) => (
              <Button
                key={tab.name}
                p="0px"
                bg="transparent"
                _hover={{ bg: "none" }}
                onClick={() => {
                  router.push(
                    `/user/${router.query.userId}${
                      index > 0 ? `/${tab.router}` : ""
                    }`
                  );
                }}
              >
                {tab.router === currentTab ? (
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
                    {tab.icon}
                    <Text
                      fontSize={tabTextSize}
                      color={textColor}
                      fontWeight="bold"
                      ms="6px"
                    >
                      {tab.name}
                    </Text>
                  </Flex>
                ) : (
                  <Flex
                    align="center"
                    w={{ lg: "135px" }}
                    borderRadius="15px"
                    justifyContent="center"
                    py="10px"
                    cursor="pointer"
                  >
                    {tab.icon}
                    <Text
                      fontSize={tabTextSize}
                      color={textColor}
                      fontWeight="bold"
                      ms="6px"
                    >
                      {tab.name}
                    </Text>
                  </Flex>
                )}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default Header;
