import { WrapItem, Stack, Wrap, Text } from "@chakra-ui/react";
import { SubStatus } from "@prisma/client";
import Pagination from "../pagination";
import UploadCard from "../uploadCard";

export default function MyUpload() {
  return (
    <Stack p={{ base: 5, lg: 10 }} spacing={10}>
      <Text fontWeight="bold" fontSize={{ base: "25px", md: "30px" }}>
        내가 SubCloud에 업로드한 영상
      </Text>
      <Wrap
        spacing={5}
        justify={{ base: "space-evenly", md: "normal" }}
        w="fit-content"
      >
        <WrapItem>
          <UploadCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            thumbnail="https://i.ytimg.com/vi/i7muqI90138/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ"
            lang="한국어"
            status={SubStatus.Approved}
            viewCount={100}
          />
        </WrapItem>
        <WrapItem>
          <UploadCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            thumbnail="https://i.ytimg.com/vi/9bZkp7q19f0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCcjOO401gtXMFAu0GngeIwZOkO-Q"
            lang="한국어"
            status={SubStatus.Approved}
            viewCount={100}
          />
        </WrapItem>
        <WrapItem>
          <UploadCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            thumbnail="https://i.ytimg.com/vi/8gsjaQ_5qIs/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAwFZR_bKOFaZOlz2RezWOoH14Ctw"
            lang="한국어"
            status={SubStatus.Pending}
            viewCount={100}
          />
        </WrapItem>
        <WrapItem>
          <UploadCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            thumbnail="https://i.ytimg.com/vi/i7muqI90138/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ"
            lang="한국어"
            status={SubStatus.InReview}
            viewCount={100}
          />
        </WrapItem>
        <WrapItem>
          <UploadCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            thumbnail="https://i.ytimg.com/vi/i7muqI90138/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ"
            lang="한국어"
            status={SubStatus.Pending}
            viewCount={100}
          />
        </WrapItem>
        <WrapItem>
          <UploadCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            thumbnail="https://i.ytimg.com/vi/i7muqI90138/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ"
            lang="한국어"
            status={SubStatus.Rejected}
            viewCount={100}
          />
        </WrapItem>
        <WrapItem>
          <UploadCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            thumbnail="https://i.ytimg.com/vi/i7muqI90138/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ"
            lang="한국어"
            status={SubStatus.Private}
            viewCount={100}
          />
        </WrapItem>
        <WrapItem>
          <UploadCard
            title="창모 - 널 지워야 해"
            time="4:30"
            link="https://www.youtube.com/watch?v=i7muqI90138"
            thumbnail="https://i.ytimg.com/vi/i7muqI90138/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ"
            lang="한국어"
            status={SubStatus.Reported}
            viewCount={100}
          />
        </WrapItem>
      </Wrap>
      <Pagination pageNum={5} currentPage={1} />
    </Stack>
  );
}
