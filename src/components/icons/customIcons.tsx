import { Box } from "@chakra-ui/react";
import { FaYoutube } from "react-icons/fa";

type YoutubeIconProps = {
  size: number | string;
};

export function YoutubeIcon({ size }: YoutubeIconProps) {
  return (
    <Box minW={size} minH={size}>
      <FaYoutube size={size} fill="#ff5b5b" />
    </Box>
  );
}
