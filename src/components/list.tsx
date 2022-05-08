import { Heading, List, ListItem } from "@chakra-ui/react";
import { ReactNode } from "react";

type JangJoProps = {
  index: number;
  title: string;
  children: ReactNode;
};

export function Jang({ index, title, children }: JangJoProps) {
  return (
    <>
      <Heading
        size="lg"
        marginTop="18px"
        marginBottom="12px"
      >{`제${index}장 ${title}`}</Heading>
      <List>{children}</List>
    </>
  );
}

export function Jo({ index, title, children }: JangJoProps) {
  return (
    <ListItem>
      <Heading
        size="md"
        marginTop="12px"
        marginBottom="6px"
      >{`제${index}조 [${title}]`}</Heading>
      {Array.isArray(children) ? <List>{children}</List> : children}
    </ListItem>
  );
}

const circledNumbers = ["\u2460", "\u2461", "\u2462", "\u2463"];

type HangListProps = {
  children?: ReactNode;
};

export function HangList({ children }: HangListProps) {
  if (Array.isArray(children)) {
    return (
      <List>
        {children?.map((child, index) => {
          return (
            <ListItem key={index}>
              {`${circledNumbers[index]} `}
              {child}
            </ListItem>
          );
        })}
      </List>
    );
  } else {
    return (
      <ListItem>
        {`${circledNumbers[0]} `}
        {children}
      </ListItem>
    );
  }
}
