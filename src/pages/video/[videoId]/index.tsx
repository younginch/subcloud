import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Video() {
  const router = useRouter();

  return (
    <>
      <Image src={`https://img.youtube.com/vi/6PlkYCfW0_U/maxresdefault.jpg`} alt="Video thumbnail" />
    </>
  );
}
