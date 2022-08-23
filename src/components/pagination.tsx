import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { HStack, Spacer, Button, useMediaQuery } from "@chakra-ui/react";

type Props = {
  hideArrow?: boolean;
  pageNum: number;
  currentPage: number;
  setPage: (page: number) => void;
};

export default function Pagination({
  hideArrow,
  pageNum,
  currentPage,
  setPage,
}: Props) {
  const [isPc] = useMediaQuery("(min-width: 850px)");
  const pageList = [];
  if (currentPage <= 2) {
    for (let i = 1; i <= Math.min(5, pageNum); i += 1) pageList.push(i);
  } else if (currentPage >= pageNum - 1) {
    for (let i = Math.max(1, pageNum - 4); i <= pageNum; i += 1)
      pageList.push(i);
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i += 1)
      pageList.push(i);
  }

  const leftButton = (
    <Button
      disabled={currentPage === 1}
      onClick={() => setPage(currentPage - 1)}
    >
      <ChevronLeftIcon />
    </Button>
  );

  const leftMostButton = (
    <Button disabled={currentPage === 1} onClick={() => setPage(1)}>
      <ArrowLeftIcon w="50%" />
    </Button>
  );

  const rightButton = (
    <Button
      disabled={currentPage === pageNum}
      onClick={() => setPage(currentPage + 1)}
    >
      <ChevronRightIcon />
    </Button>
  );

  const rightMostButton = (
    <Button disabled={currentPage === pageNum} onClick={() => setPage(pageNum)}>
      <ArrowRightIcon w="50%" />
    </Button>
  );

  if (pageNum === 0) return null;

  if (isPc) {
    return (
      <HStack>
        <Spacer />
        {!hideArrow && (
          <>
            {leftMostButton}
            {leftButton}
          </>
        )}
        <Spacer />
        {pageList.map((value) => (
          <Button
            key={value}
            colorScheme={value === currentPage ? "blue" : "gray"}
            onClick={() => setPage(value)}
          >
            {value}
          </Button>
        ))}
        <Spacer />
        {!hideArrow && (
          <>
            {rightButton}
            {rightMostButton}
          </>
        )}
        <Spacer />
      </HStack>
    );
  }

  return (
    <HStack>
      <Spacer />
      {!hideArrow && leftButton}
      <Spacer />
      {pageList.map((value) => (
        <Button
          key={value}
          colorScheme={value === currentPage ? "blue" : "gray"}
          onClick={() => setPage(value)}
        >
          {value}
        </Button>
      ))}
      <Spacer />
      {!hideArrow && rightButton}
      <Spacer />
    </HStack>
  );
}
