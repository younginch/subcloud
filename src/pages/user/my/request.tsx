import { Role } from "@prisma/client";
import axios from "axios";
import type { GetServerSideProps } from "next";
import RequestPanel from "../../../components/user/requestPanel";
import { PageOptions, ResRequestSearch } from "../../../utils/types";

type UserMyRequestProps = {
  requests: ResRequestSearch;
};

export default function UserMyRequest({ requests }: UserMyRequestProps) {
  return <RequestPanel requests={requests} />;
}

export const getServerSideProps: GetServerSideProps<
  UserMyRequestProps
> = async (context) => {
  const { userId } = context.query;
  const requestsRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/request/search?userId=${userId}`
  );
  return {
    props: {
      requests: requestsRes.data,
    },
  };
};

UserMyRequest.options = { role: Role.User, hideTitle: true } as PageOptions;
