import { TriangleDownIcon } from "@chakra-ui/icons";
import { Button, Center } from "@chakra-ui/react";

type Props = {
  hidden?: boolean;
  onClick: () => void;
};

export default function LoadMoreBtn({ hidden, onClick }: Props) {
  return (
    <Center>
      <Button
        hidden={hidden}
        onClick={onClick}
        colorScheme="purple"
        rightIcon={<TriangleDownIcon />}
      >
        load more
      </Button>
    </Center>
  );
}
