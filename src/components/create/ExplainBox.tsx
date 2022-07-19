import { UnorderedList, useColorModeValue } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export default function ExplainBox({ children }: Props) {
  return (
    <UnorderedList
      color="white"
      bg={useColorModeValue(
        "rgba( 205, 205, 255, 0.2 )",
        "rgba( 85, 85, 85, 0.2 )"
      )}
      border={useColorModeValue(
        "2px solid rgba( 255, 255, 255, 0.4 )",
        "2px solid rgba( 105, 105, 105, 0.5 )"
      )}
      className="create-glassmorphism"
      mt="12vh !important"
      p={{ base: "20px 10px 20px 40px", md: "20px 20px 20px 50px" }}
      borderRadius="15px"
      boxShadow="2xl"
      fontSize={{ base: "14px", md: "18px" }}
      spacing="10px"
      maxW="85%"
    >
      {children}
    </UnorderedList>
  );
}
