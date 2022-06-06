import {
  Text,
  Flex,
  Tooltip,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

type Props = {
  pageIndex: number;
  gotoPage: (page: number) => void;
  pageCount: number;
  pageSize: number;
};
export default function RankPagination({
  pageIndex,
  gotoPage,
  pageCount,
  pageSize,
}: Props) {
  const [isMedium] = useMediaQuery("(min-width: 720px)");
  return (
    <Flex justifyContent="space-between" m={4} alignItems="center">
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            onClick={() => gotoPage(1)}
            isDisabled={pageIndex <= 1}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
            aria-label={""}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={() => gotoPage(pageIndex - 1)}
            isDisabled={pageIndex <= 1}
            icon={<ChevronLeftIcon h={6} w={6} />}
            aria-label={""}
          />
        </Tooltip>
      </Flex>
      <Flex alignItems="center">
        <Text mr={8}>
          Page{" "}
          <Text fontWeight="bold" as="span">
            {pageIndex}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {pageCount}
          </Text>
        </Text>
        {isMedium && (
          <>
            <Text>Go to page:</Text>{" "}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageCount}
              onChange={(value: string) => {
                const page = Number(value);
                gotoPage(page);
              }}
              value={pageIndex}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </>
        )}
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            onClick={() => gotoPage(pageIndex + 1)}
            isDisabled={pageIndex === pageCount}
            icon={<ChevronRightIcon h={6} w={6} />}
            aria-label="Next Page Btn"
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => gotoPage(pageCount)}
            isDisabled={pageIndex === pageCount}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
            aria-label="Last Page Btn"
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}
