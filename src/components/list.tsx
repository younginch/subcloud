import { Heading, List, ListItem, OrderedList } from "@chakra-ui/react";
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

const circledNumbers = [
  "\u2460",
  "\u2461",
  "\u2462",
  "\u2463",
  "\u2464",
  "\u2465",
  "\u2466",
  "\u2467",
  "\u2468",
  "\u2469",
];

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

type HoListProps = {
  children: (JSX.Element | string)[];
};

export function HoList({ children }: HoListProps) {
  return (
    <OrderedList marginStart="24px">
      {children.map((item, index) => {
        return <ListItem key={index}>{item}</ListItem>;
      })}
    </OrderedList>
  );
}
