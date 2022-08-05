import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import SubPanel from "../../../components/user/subPanel";
import { PageOptions, ResSubSearch } from "../../../utils/types";

export default function UserMySub() {
  const session = useSession();
  const { data } = useSWR<ResSubSearch>(
    `/api/public/search/sub?userId=${session.data?.user.id}`
  );
  return data && <SubPanel initialSubs={data} />;
}

UserMySub.auth = Role.User;

UserMySub.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
