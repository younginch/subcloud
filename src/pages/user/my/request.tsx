import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import RequestPanel from "../../../components/user/requestPanel";
import { PageOptions, ResRequestSearch } from "../../../utils/types";

export default function UserMyRequest() {
  const session = useSession();
  const { data: requests } = useSWR<ResRequestSearch>(
    `/api/public/search/request?userId=${session.data?.user.id}`
  );
  return requests ? <RequestPanel requests={requests} /> : <></>;
}

UserMyRequest.options = { role: Role.User, hideTitle: true } as PageOptions;
