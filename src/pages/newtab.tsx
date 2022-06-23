import {
  Center,
  Heading,
  VStack,
  HStack,
  Spacer,
  Text,
  Avatar,
  Box,
  Input,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { AiFillYoutube, AiOutlineSearch } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import Bookmark from "../components/newtab/bookmark";
import ShortCut from "../components/newtab/shortCut";
import SwingProvider from "../components/swingProvider";
import { PageOptions } from "../utils/types";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import router from "next/router";

type FormData = {
  keyword: string;
};

export default function NewTab() {
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    router.push(`https://www.google.com/search?q=${values.keyword}`);
  }

  return (
    <>
      <VStack
        bgGradient="linear-gradient(120deg, hsl(238deg 57% 56%) 0%,  hsl(0deg 74% 58%) 100%)"
        h="100vh"
      >
        <HStack
          spacing={2}
          w="100%"
          pl={2}
          pt={1}
          pb={1}
          bgColor="rgba(10,10,10,.1)"
        >
          <Bookmark
            title="youtube"
            href="https://www.youtube.com/"
            icon={<AiFillYoutube />}
          />
          <Bookmark
            title="youtube"
            href="https://www.youtube.com/"
            icon={<AiFillYoutube />}
          />
        </HStack>
        <HStack w="100%" pr={2} color="white">
          <Text fontSize="2xl" ml={5}>
            {1241}
            {" · Views"}
          </Text>
          <Spacer />
          <Text>Gmail</Text>
          <Text>Drive</Text>
          <Box w="25px" h="25px">
            <CgMenuGridO size="100%" color="black" />
          </Box>
          <Avatar size="sm" src={session?.user.image ?? undefined} />
        </HStack>
        <Center mt="15vh !important">
          <Heading color="white" fontSize="7xl" fontWeight="extrabold">
            SubCloud
          </Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box position="relative" mt="7vh !important">
            <Button
              color="black"
              bg="none"
              fontSize="20px"
              position="absolute"
              w="50px"
              h="50px"
              ml="15px"
              mt="7px"
              zIndex={3}
              isLoading={isSubmitting}
              type="submit"
            >
              <SwingProvider>
                <AiOutlineSearch />
              </SwingProvider>
            </Button>
            <Input
              id="url"
              placeholder="구글 검색 또는 URL 입력"
              w={{
                base: "90vw",
                sm: "85vw",
                md: "80vw",
                lg: "60vw",
                xl: "50vw",
              }}
              maxW="800px"
              h={16}
              fontSize="20px"
              borderRadius="5em"
              pl="1em"
              shadow="md"
              textAlign="center"
              bg="white"
              {...register("keyword", { required: "Thius is required" })}
            />
            <NextLink href="https://images.google.com/">
              <Button
                color="black"
                bg="none"
                fontSize="20px"
                position="absolute"
                w="50px"
                h="50px"
                ml="-60px"
                mt="7px"
                zIndex={3}
              >
                <SwingProvider>
                  <BsImageFill />
                </SwingProvider>
              </Button>
            </NextLink>
          </Box>
        </form>
        <Wrap justify="center" maxW="700px" spacing={5} mt="5vh !important">
          <WrapItem>
            <ShortCut
              title="youtube"
              href="https://www.youtube.com/"
              icon={<AiFillYoutube size="65%" fill="red" />}
            />
          </WrapItem>
          <WrapItem>
            <ShortCut
              title="youtube"
              href="https://www.youtube.com/"
              icon={<AiFillYoutube size="65%" fill="red" />}
            />
          </WrapItem>
          <WrapItem>
            <ShortCut
              title="youtube"
              href="https://www.youtube.com/"
              icon={<AiFillYoutube size="65%" fill="red" />}
            />
          </WrapItem>
          <WrapItem>
            <ShortCut
              title="youtube"
              href="https://www.youtube.com/"
              icon={<AiFillYoutube size="65%" fill="red" />}
            />
          </WrapItem>
          <WrapItem>
            <ShortCut
              title="youtube"
              href="https://www.youtube.com/"
              icon={<AiFillYoutube size="65%" fill="red" />}
            />
          </WrapItem>
          <WrapItem>
            <ShortCut
              title="youtube"
              href="https://www.youtube.com/"
              icon={<AiFillYoutube size="65%" fill="red" />}
            />
          </WrapItem>
          <WrapItem>
            <ShortCut
              title="youtube"
              href="https://www.youtube.com/"
              icon={<AiFillYoutube size="65%" fill="red" />}
            />
          </WrapItem>
          <WrapItem>
            <ShortCut
              title="youtube"
              href="https://www.youtube.com/"
              icon={<AiFillYoutube size="65%" fill="red" />}
            />
          </WrapItem>
        </Wrap>
        <HStack
          position="absolute"
          mt="calc(100vh - 100px) !important"
          w="100%"
          pl="15px"
        >
          <Box bg="gray.100" w="400px" h="80px">
            <Text>여기에 광고</Text>
          </Box>
          <Spacer />
        </HStack>
      </VStack>
    </>
  );
}

NewTab.options = {
  auth: false,
  hideTitle: true,
  hideNavBar: true,
  hideFooter: true,
} as PageOptions;
