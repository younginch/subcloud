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
};

export default function Pagination({ hideArrow, pageNum, currentPage }: Props) {
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
  if (isPc) {
    return (
      <HStack>
        <Spacer />
        {!hideArrow && (
          <>
            <Button disabled={currentPage === 1}>
              <ArrowLeftIcon w="50%" />
            </Button>
            <Button disabled={currentPage === 1}>
              <ChevronLeftIcon />
            </Button>
          </>
        )}
        <Spacer />
        {pageList.map((value) => (
          <Button
            key={value}
            colorScheme={value === currentPage ? "blue" : "gray"}
          >
            {value}
          </Button>
        ))}
        <Spacer />
        {!hideArrow && (
          <>
            <Button disabled={currentPage === pageNum}>
              <ChevronRightIcon />
            </Button>
            <Button disabled={currentPage === pageNum}>
              <ArrowRightIcon w="50%" />
            </Button>
          </>
        )}
        <Spacer />
      </HStack>
    );
  }

  return (
    <HStack>
      <Spacer />
      {!hideArrow && (
        <Button disabled={currentPage === 1}>
          <ChevronLeftIcon />
        </Button>
      )}
      <Spacer />
      {pageList.map((value) => (
        <Button
          key={value}
          colorScheme={value === currentPage ? "blue" : "gray"}
        >
          {value}
        </Button>
      ))}
      <Spacer />
      {!hideArrow && (
        <Button disabled={currentPage === pageNum}>
          <ChevronRightIcon />
        </Button>
      )}
      <Spacer />
    </HStack>
  );
}
