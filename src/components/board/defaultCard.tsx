import { Stack, Box, Image, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

type CardProps = {
  disabled?: boolean;
  imageUrl: string;
  link: string;
  children?: React.ReactNode;
};

export default function DefaultCard({
  disabled,
  imageUrl,
  link,
  children,
}: CardProps) {
  const router = useRouter();

  return (
    <motion.div whileHover={{ translateY: disabled ? 0 : -8 }}>
      <Stack
        w="350px"
        h="fit-content"
        pb="10px"
        borderRadius="10px"
        overflow="hidden"
        cursor={disabled ? "default" : "pointer"}
        bg={useColorModeValue("white", "gray.700")}
        onClick={() => router.push(link)}
      >
        <Box w="350px" h="350px">
          <Image
            src={imageUrl}
            alt="Announce Image"
            filter={disabled ? "brightness(50%)" : "none"}
          />
        </Box>
        <Stack pl="15px">{children}</Stack>
      </Stack>
    </motion.div>
  );
}
