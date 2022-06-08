import { ReactElement } from "react";

type UserLayoutProps = {
  children: ReactElement;
};

export default function UserLayout({ children }: UserLayoutProps) {
  return <>{children}</>;
}
