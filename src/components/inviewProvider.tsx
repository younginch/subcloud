import { ScaleFade } from "@chakra-ui/react";
import { useInView } from "react-hook-inview";

type Props = {
  children: React.ReactNode;
};

export default function InViewProvider({ children }: Props) {
  const [ref, isVisible] = useInView({
    threshold: 0.3,
    unobserveOnEnter: true,
  });

  return (
    <ScaleFade
      ref={ref}
      initialScale={0.9}
      in={isVisible}
      whileHover={{ scale: 1.01 }}
    >
      {children}
    </ScaleFade>
  );
}
