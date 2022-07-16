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
} from "../../utils/useSystemTheme";

type Props = {
  isLarge: boolean;
};

function getThemeIcon(theme: Theme): ReactElement {
  return theme === Theme.LIGHT ? <SunIcon /> : <MoonIcon />;
}

export default function SelectTheme({ isLarge }: Props): JSX.Element {
  const { t } = useTranslation("common");
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
          variant="outline"
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
          <MenuItemOption value={Theme.SYNC}>{t("sync")}</MenuItemOption>
          <MenuItemOption value={Theme.LIGHT} icon={<SunIcon />}>
            {t("light")}
          </MenuItemOption>
          <MenuItemOption value={Theme.DARK} icon={<MoonIcon />}>
            {t("dark")}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
