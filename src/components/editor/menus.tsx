import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

export default function Menus() {
  return (
    <HStack>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          파일(F)
        </MenuButton>
        <MenuList>
          <MenuItem icon={<AddIcon />} command="⌘T">
            새 창
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
            유튜브 동영상 열기...
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="⌘O">
            자막 파일 열기...
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="⌘O">
            SRT 파일로 저장...
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          편집(E)
        </MenuButton>
        <MenuList>
          <MenuItem icon={<AddIcon />} command="⌘T">
            새 자막
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
            모두 지우기
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="⌘O">
            Open File...
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          보기(V)
        </MenuButton>
        <MenuList>
          <MenuItem icon={<AddIcon />} command="⌘T">
            New Tab
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
            New Window
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="⌘O">
            Open File...
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          재생(Y)
        </MenuButton>
        <MenuList>
          <MenuItem icon={<AddIcon />} command="⌘T">
            New Tab
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
            New Window
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="⌘O">
            Open File...
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
