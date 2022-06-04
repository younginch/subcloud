declare module "react-type-animation" {
  interface MyComponentProps {
    cursor: boolean;
    sequence: (string | number)[];
    wrapper: string;
    className: string;
    repeat: number;
  }

  export default function TypeAnimation(
    props: MyComponentProps
  ): FunctionComponent<MyComponentProps>;
}
