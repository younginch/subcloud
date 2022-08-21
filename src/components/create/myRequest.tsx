import {
  Stack,
  Text,
  useMediaQuery,
  Grid,
  GridItem,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { BiMessageSquareAdd } from "react-icons/bi";
import useTranslation from "next-translate/useTranslation";
import { RefObject, useState } from "react";
import { ResRequestSearch } from "../../utils/types";
import Pagination from "../pagination";
import RequestCard from "../requestCard";
import { GoalExpr, PointGoal } from "../../utils/etc";

function MyRequestPanel({
  requests,
}: {
  requests: ResRequestSearch | undefined;
}) {
  const [col2, col3, col4, col5, col6] = useMediaQuery([
    "(min-width: 750px)",
    "(min-width: 1030px)",
    "(min-width: 1400px)",
    "(min-width: 1700px)",
    "(min-width: 2000px)",
  ]);
  const goalExpr = GoalExpr();

  return (
    <Grid
      templateColumns={`repeat(${
        1 +
        Number(col2) +
        Number(col3) +
        Number(col4) +
        Number(col5) +
        Number(col6)
      }, 1fr)`}
      gap={5}
      justifyItems="center"
    >
      {requests?.map(
        (request) =>
          request.video && (
            <GridItem key={request.id}>
              <RequestCard
                title={request.video.youtubeVideo?.title ?? ""}
                time={request.video.youtubeVideo?.duration ?? 0}
                link={request.video.url ?? ""}
                thumbnail={`http://img.youtube.com/vi/${request.video.videoId}/0.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
                requestLang={request.lang}
                requestStatus={request.status}
                serviceId={request.video.serviceId}
                videoId={request.video.videoId}
                requestPoint={request.point}
                requestGoal={
                  PointGoal(
                    request.video.youtubeVideo
                      ? request.video.youtubeVideo.duration
                      : undefined,
                    goalExpr
                  ) ?? 1000000
                }
                buttonType="request"
              />
            </GridItem>
          )
      )}
    </Grid>
  );
}

type Props = {
  inputRef: RefObject<HTMLInputElement>;
};

export default function MyRequest({ inputRef }: Props) {
  const { t } = useTranslation("create");
  const session = useSession();
  const [page, setPage] = useState<number>(1);
  const pageSize = 12;

  const { data: requests } = useSWR<ResRequestSearch>(
    `/api/public/search/request?userId=${session.data?.user.id}`
  );
  const start = pageSize * (page - 1);
  const end = pageSize * page;
  const num = Math.ceil((requests?.length ?? 0) / pageSize);

  const messageColor = useColorModeValue("black", "white");
  const bgActiveColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stack p={{ base: 5, lg: 10 }} spacing={10}>
      <Text fontWeight="bold" fontSize={{ base: "25px", md: "30px" }}>
        {t("my_req")}
      </Text>
      {requests?.length ? (
        <MyRequestPanel requests={requests.slice(start, end)} />
      ) : (
        <Stack
          alignItems="center"
          spacing={5}
          h="100%"
          p="3%"
          _hover={{ bg: bgActiveColor, color: "blue.500" }}
          cursor="pointer"
          borderRadius="20px"
          borderStyle="dashed"
          borderColor="gray.500"
          borderWidth="3px"
          onClick={() => {
            console.log(inputRef);
            inputRef.current?.focus();
          }}
        >
          <Box w={{ base: "100px", sm: "150px" }}>
            <BiMessageSquareAdd size="full" />
          </Box>
          <Text
            color={messageColor}
            fontSize={{ base: "15px", sm: "20px", md: "25px" }}
          >
            {t("no_req")}
          </Text>
        </Stack>
      )}
      <Pagination pageNum={num} currentPage={page} setPage={setPage} />
    </Stack>
  );
}
