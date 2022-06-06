import axios from "axios";
import { ResRankingUser } from "../../../utils/types";
import { GetServerSideProps } from "next";
import UserRankTable from "../../../components/ranking/userRankTable";

type UserRankingPageProps = {
  users: ResRankingUser;
};

export default function UserRankingPage({ users }: UserRankingPageProps) {
  //Pagination

  const userRanking = () => {
    return users.map((user) => {
      return (
        <p key={user.id}>
          name: {user.name}, email: {user.email}, image: {user.image}, subs:{" "}
          {user._count.subs}, views: {user._count.views}, fulfilledRequests:{" "}
          {user._count.fulfilledRequests}
        </p>
      );
    });
  };

  return (
    <>
      <p>userRanking</p>
      {userRanking()}
      <UserRankTable users={users} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  UserRankingPageProps
> = async (context) => {
  const userViewQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/view`;
  const userSubQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/sub`;
  const userFulfilledRequestsQuery = `${process.env.NEXTAUTH_URL}/api/ranking/user/fulfilledRequests`;
  const resUsers = await axios.get<ResRankingUser>(userViewQuery, {
    params: { start: 0, end: 50 },
  });
  const users = resUsers.data;
  return { props: { users } };
};

UserRankingPage.hideTitle = true;
