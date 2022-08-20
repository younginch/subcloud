import { Stack } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  btnComponent?: React.ReactNode;
};

export default function GeneralRanking({ children, btnComponent }: Props) {
  return (
    <Stack pb="20px">
      {children}
      {btnComponent}
    </Stack>
  );
}
