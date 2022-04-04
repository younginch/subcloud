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
} from "@chakra-ui/react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import ToolBar from "./toolBar";
import Links from "./links";

export default function NavBar(): JSX.Element {
  const { colorMode } = useColorMode();
  const { t } = useTranslation("common");
  const [isLarge] = useMediaQuery("(min-width: 840px)");
  const [isMedium] = useMediaQuery("(min-width: 480px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
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
      }}
      w="100%"
      h="54px"
      top="0"
      left="0"
      position="sticky"
      zIndex={9999}
    >
      <HStack
        padding="6px"
        h="100%"
        maxWidth="1024px"
        width="100%"
        zIndex={10}
        marginStart="auto"
        marginEnd="auto"
        alignContent="space-between"
      >
        <Heading size="md" marginX="6px" flex={1}>
          <Link href="/">{t("title")}</Link>
        </Heading>
        {!isLarge &&
          (isMedium ? <ToolBar isLarge={true} /> : <ToolBar isLarge={false} />)}
        {isLarge ? (
          <Links />
        ) : (
          <>
            <IconButton
              variant="ghost"
              aria-label="hamburger"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={isOpen ? onClose : onOpen}
            />
            <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerBody marginTop="54px">
                    <VStack>
                      <Links width="96vw" />
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </>
        )}
        {isLarge && <ToolBar isLarge={true} />}
      </HStack>
    </Box>
  );
}
