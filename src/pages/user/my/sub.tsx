import { Role } from "@prisma/client";
import axios from "axios";
import type { GetServerSideProps } from "next";
import SubPanel from "../../../components/user/subPanel";
import { PageOptions, ResSubSearch } from "../../../utils/types";

type UserMySub = {
  subs: ResSubSearch;
};

export default function UserMySub({ subs }: UserMySub) {
  return <SubPanel subs={subs} />;
}

UserMySub.auth = Role.User;

export const getServerSideProps: GetServerSideProps<UserMySub> = async (
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

UserMySub.options = { role: Role.User, hideTitle: true } as PageOptions;
