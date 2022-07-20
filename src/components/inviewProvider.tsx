import { ScaleFade } from "@chakra-ui/react";
import { useInView } from "react-hook-inview";

type Props = {
  initialScale?: number;
  whileHover?: number;
  children: React.ReactNode;
};

export default function InViewProvider({
  initialScale,
  whileHover,
  children,
}: Props) {
  const [ref, isVisible] = useInView({
    threshold: 0.3,
    unobserveOnEnter: true,
  });

  return (
    <ScaleFade
      ref={ref}
      initialScale={initialScale}
      in={isVisible}
      whileHover={{ scale: whileHover }}
    >
      {children}
    </ScaleFade>
  );
}

InViewProvider.defaultProps = {
  initialScale: 0.9,
  whileHover: 1.01,
};
