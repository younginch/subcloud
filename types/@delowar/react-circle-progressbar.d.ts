declare module "@delowar/react-circle-progressbar" {
  interface GradientProgressProps {
    children: React.ReactNode;
    percent: number;
    viewport: boolean;
    size: number;
    isGradient: boolean;
    gradient: {
      angle: number;
      startColor: string;
      stopColor: string;
    };
    emptyColor: string;
  }

  export default function GradientProgress(
    props: GradientProgressProps
  ): FunctionComponent<GradientProgressProps>;
}
