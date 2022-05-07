import { Heading, ListItem } from "@chakra-ui/react";

type JangJoProps = {
  children: string;
};

export function Jang({ children }: JangJoProps) {
  return (
    <Heading size="lg" marginTop="18px" marginBottom="12px">
      {children}
    </Heading>
  );
}

export function Jo({ children }: JangJoProps) {
  return (
    <Heading size="md" marginTop="12px" marginBottom="6px">
      {children}
    </Heading>
  );
}

type HangProps = {
  children: string;
  index: number;
};

const circledNumbers = ["", "\u2460", "\u2461", "\u2462", "\u2463"];

export function Hang({ children, index }: HangProps) {
  return (
    <ListItem>
      {`${circledNumbers[index]} `}
      {children}
    </ListItem>
  );
}
