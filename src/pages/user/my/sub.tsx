import { Role } from "@prisma/client";
import axios from "axios";
import type { GetServerSideProps } from "next";
import SubPanel from "../../../components/user/subPanel";
import { PageOptions, ResSubSearch } from "../../../utils/types";

type UserMySubProps = {
  subs: ResSubSearch;
};

export default function UserMySub({ subs }: UserMySubProps) {
  return <SubPanel initialSubs={subs} />;
}

UserMySub.auth = Role.User;

export const getServerSideProps: GetServerSideProps<UserMySubProps> = async (
  context
) => {
  const { userId } = context.query;
  const subsRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/public/search/sub?userId=${userId}`
  );
  return {
    props: {
      subs: subsRes.data,
    },
  };
};

UserMySub.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
