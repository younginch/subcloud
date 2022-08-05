import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { HStack, Spacer, Button, useMediaQuery } from "@chakra-ui/react";

export default function Pagination({ hideArrow }: { hideArrow?: boolean }) {
  const [isPc] = useMediaQuery("(min-width: 850px)");
  if (isPc) {
    return (
      <HStack>
        <Spacer />
        {!hideArrow && (
          <>
            <Button>
              <ArrowLeftIcon w="50%" />
            </Button>
            <Button>
              <ChevronLeftIcon />
            </Button>
          </>
        )}
        <Spacer />
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Spacer />
        {!hideArrow && (
          <>
            <Button>
              <ChevronRightIcon />
            </Button>
            <Button>
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
        <Button>
          <ChevronLeftIcon />
        </Button>
      )}
      <Spacer />
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>5</Button>
      <Spacer />
      {!hideArrow && (
        <Button>
          <ChevronRightIcon />
        </Button>
      )}
      <Spacer />
    </HStack>
  );
}
