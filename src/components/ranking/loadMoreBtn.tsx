import { Button, Center } from "@chakra-ui/react";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function LoadMoreBtn({ disabled, onClick }: Props) {
  return (
    <Center>
      <Button disabled={disabled} onClick={onClick}>
        load more
      </Button>
    </Center>
  );
}
