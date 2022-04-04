import React from "react";
import SelectTheme from "./selectTheme";
import SelectTranslation from "./selectTranslation";

type Props = {
  isLarge: boolean;
};

export default function ToolBar({ isLarge }: Props): JSX.Element {
  return (
    <>
      <SelectTranslation isLarge={isLarge} />
      <SelectTheme isLarge={isLarge} />
    </>
  );
}
