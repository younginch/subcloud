import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import useSystemTheme, {
  getCurrentTheme,
  Theme,
} from "../utils/useSystemTheme";

type Props = {
  isLarge: boolean;
};

function getThemeIcon(theme: Theme): ReactElement {
  return theme === Theme.LIGHT ? <SunIcon /> : <MoonIcon />;
}

export default function SelectTheme({ isLarge }: Props): JSX.Element {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const systemTheme = useSystemTheme();
  const [theme, setTheme] = useState<Theme>(Theme.SYNC);
  const [themeIcon, setThemeIcon] = useState<ReactElement>(
    getThemeIcon(getCurrentTheme())
  );

  useEffect(() => {
    if (theme === Theme.SYNC) {
      if (colorMode !== systemTheme) {
        toggleColorMode();
      }
      setThemeIcon(getThemeIcon(systemTheme));
    } else {
      if (colorMode !== theme) {
        toggleColorMode();
      }
      setThemeIcon(getThemeIcon(theme));
    }
  }, [theme, systemTheme, colorMode, toggleColorMode]);

  function handleChange(value: string) {
    setTheme(value as Theme);
  }

  return (
    <Menu>
      {isLarge ? (
        <MenuButton
          as={Button}
          leftIcon={themeIcon}
          rightIcon={<ChevronDownIcon />}
        >
          {t("theme")}
        </MenuButton>
      ) : (
        <MenuButton as={IconButton} icon={themeIcon} />
      )}
      <MenuList>
        <MenuOptionGroup
          defaultValue={theme}
          onChange={(value) => {
            handleChange(value as string);
          }}
          title={t("theme")}
          type="radio"
        >
          <MenuItemOption value={Theme.SYNC}>시스템과 동일</MenuItemOption>
          <MenuItemOption value={Theme.LIGHT} icon={<SunIcon />}>
            밝게
          </MenuItemOption>
          <MenuItemOption value={Theme.DARK} icon={<MoonIcon />}>
            어둡게
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
