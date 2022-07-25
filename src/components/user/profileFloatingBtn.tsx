import { Button, useColorModeValue } from "@chakra-ui/react";
import { CgMenuGridR } from "react-icons/cg";

type Props = {
  onOpen: () => void;
};

export default function ProfileFloatingBtn({ onOpen }: Props) {
  const bgButton = useColorModeValue("white", "gray.600");

  return (
    <Button
      h="52px"
      w="52px"
      onClick={onOpen}
      bg={bgButton}
      position="fixed"
      variant="no-hover"
      right="10px"
      top="60px"
      borderRadius="50px"
      boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
      className="helloEx"
      zIndex={2}
    >
      <CgMenuGridR size={40} cursor="pointer" />
    </Button>
  );
}
