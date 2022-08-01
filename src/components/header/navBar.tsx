import React from "react";
import {
  Box,
  Heading,
  HStack,
  useColorMode,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  IconButton,
  useMediaQuery,
  VStack,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import ToolBar from "./toolBar";
import Links from "./links";
import Search from "./search";

export default function NavBar(): JSX.Element {
  const { colorMode } = useColorMode();
  const { t } = useTranslation("common");
  const [isLarge] = useMediaQuery("(min-width: 840px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showSearch = false;

  return (
    <Box
      as={Flex}
      bg={
        colorMode === "light"
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(29, 29, 29, 0.7)"
      }
      borderBottomColor={
        colorMode === "light"
          ? "rgba(200, 200, 200, 0.7)"
          : "rgba(255, 255, 255, 0.2)"
      }
      borderBottomWidth="1px"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,.2)",
      }}
      w="100%"
      h="54px"
      top="0"
      left="0"
      position="sticky"
      zIndex={1500}
    >
      <HStack
        paddingStart={isLarge ? 6 : 3}
        paddingEnd={isLarge ? 9 : 3}
        h="100%"
        w="1300px"
        maxW="100%"
        zIndex={10}
        marginStart="auto"
        marginEnd="auto"
        alignContent="space-between"
      >
        {!isLarge && (
          <IconButton
            variant="ghost"
            aria-label="hamburger"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
          />
        )}
        <Heading size="md" marginX="6px" onClick={onClose}>
          <Link href="/">{t("title")}</Link>
        </Heading>
        {showSearch ? (
          <Flex flex={1}>
            <Spacer />
            <Search />
            <Spacer />
          </Flex>
        ) : (
          <Spacer />
        )}
        {!isLarge && <ToolBar />}
        {isLarge ? (
          <Links />
        ) : (
          <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerBody marginTop="54px">
                  <VStack>
                    <Links width="96vw" onClick={onClose} />
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        )}
        {isLarge && (
          <>
            <Spacer />
            <ToolBar />
          </>
        )}
      </HStack>
    </Box>
  );
}
