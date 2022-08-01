import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineBug, AiOutlineYoutube } from "react-icons/ai";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineRateReview } from "react-icons/md";
import { CloseIcon } from "@chakra-ui/icons";
import { motion, useAnimation } from "framer-motion";
import { BsPen } from "react-icons/bs";
import { NotifyType } from "@prisma/client";

type Props = {
  id: string;
  notifyType: NotifyType;
  title: string;
  time: string;
  content: string;
  href: string | undefined;
  onRemove: () => void;
};

export default function NotifyCard({
  id,
  notifyType,
  title,
  time,
  content,
  href,
  onRemove,
}: Props) {
  let labelColor;
  let timeColor;
  let notifyIcon;
  const controls = useAnimation();
  const strokeColor = useColorModeValue("#888888", "#bbbbbb");

  switch (notifyType) {
    case NotifyType.Announce:
      labelColor = "blue.600";
      timeColor = "blue.300";
      notifyIcon = <HiOutlineSpeakerphone size="30px" stroke={strokeColor} />;
      break;
    case NotifyType.Upload:
      labelColor = "red.400";
      timeColor = "red.300";
      notifyIcon = <AiOutlineYoutube size="30px" stroke={strokeColor} />;
      break;
    case NotifyType.Review:
      labelColor = "purple.600";
      timeColor = "purple.300";
      notifyIcon = <MdOutlineRateReview size="30px" stroke={strokeColor} />;
      break;
    case NotifyType.StatusChange:
      labelColor = "green.600";
      timeColor = "green.300";
      notifyIcon = <BsPen size="30px" stroke={strokeColor} />;
      break;
    default:
      labelColor = "white";
      timeColor = "white";
      notifyIcon = <AiOutlineBug size="30px" stroke={strokeColor} />;
  }

  const handleRemove = (link?: string) => {
    controls.start((event: string) => {
      if (event === id) {
        return {
          scale: 1.025,
          x: -50,
          opacity: 0,
          transition: { duration: 0.2 },
        };
      }
      return {
        opcaity: 1,
        x: 0,
        scale: 1,
      };
    });
    setTimeout(() => {
      onRemove();
      if (link) {
        window.open(link, "_blank");
      }
    }, 400);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.025,
        transition: { duration: 0.1 },
      }}
      animate={controls}
      className={`motiondiv${title}`}
      custom={id}
      style={{
        width: "100%",
      }}
    >
      <HStack
        w="100%"
        borderRadius="7px"
        overflow="hidden"
        bg={useColorModeValue("#f9f9f9", "#475771")}
        h="77px"
      >
        <Box w="6px" h="100%" bg={labelColor} />
        <HStack
          pt="15px"
          pb="15px"
          h="fit-content"
          ml="0px !important"
          w="full"
        >
          <Flex
            h="100%"
            w="100px"
            alignItems="center"
            justifyContent="center"
            ml="0px !important"
          >
            {notifyIcon}
          </Flex>
          <Stack
            w="full"
            ml="0px !important"
            h="100% !important"
            justifyContent="center"
            onClick={() => {
              handleRemove(href);
            }}
            cursor="pointer"
          >
            <HStack spacing="25px">
              <Text fontSize="17px" fontWeight="bold">
                {title}
              </Text>
              <Text fontSize="14px" color={timeColor}>
                {time}
              </Text>
            </HStack>
            <Text fontSize="14px">{content}</Text>
          </Stack>
          <Flex
            h="100%"
            w="60px"
            alignItems="center"
            justifyContent="center"
            ml="0px !important"
          >
            <CloseIcon
              w="30px"
              h="30px"
              p="7px"
              _hover={{ bg: labelColor }}
              borderRadius="50%"
              opacity={0.3}
              onClick={() => handleRemove()}
              cursor="pointer"
            />
          </Flex>
        </HStack>
      </HStack>
    </motion.div>
  );
}
