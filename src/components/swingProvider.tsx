import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function SwingProvider({ children }: Props) {
  const [onHover, setOnHover] = useState<boolean>(false);
  const mouseLeave = () => {
    setOnHover(false);
  };
  const mouseEnter = () => {
    setOnHover(true);
  };
  return (
    <div
      onMouseLeave={mouseLeave}
      onMouseEnter={mouseEnter}
      className={`${onHover ? "spinComponent" : ""}`}
    >
      {children}
    </div>
  );
}
