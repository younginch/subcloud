import { Box } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

type Props = {
  active: boolean;
  imgUrl: StaticImageData;
};

export default function CarouselPage({ active, imgUrl }: Props) {
  return (
    <Box
      overflow="hidden"
      className={active ? "imagePage activePage" : "imagePage"}
      w="100%"
      h="100%"
    >
      <Image height="720px" src={imgUrl} alt="Picture of mainpage" />
    </Box>
  );
}
