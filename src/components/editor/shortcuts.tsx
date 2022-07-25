import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Kbd,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

export default function Shortcuts() {
  const { t } = useTranslation("editor");
  const shortcutsData = [
    {
      action: t("play_pause"),
      keys: ["space"],
    },
    {
      action: t("create"),
      keys: ["["],
    },
    {
      action: t("cut"),
      keys: ["]"],
    },
    {
      action: t("split"),
      keys: ["\\ or /"],
    },
    {
      action: t("skip_05"),
      keys: ["right arrow"],
    },
    {
      action: t("skip_back_05"),
      keys: ["left arrow"],
    },
    {
      action: t("skip_5"),
      keys: ["shift", "right"],
    },
    {
      action: t("skip_back_5"),
      keys: ["shift", "left"],
    },
    {
      action: t("line_break"),
      keys: ["shift", "enter"],
    },
  ];
  return (
    <TableContainer h="full" overflowX="hidden">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th p="8px 10px 8px 10px">{t("action")}</Th>
            <Th p="8px 10px 8px 10px">{t("shortcut")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shortcutsData.map(({ action, keys }) => (
            <Tr key={action}>
              <Td p="8px 10px 8px 10px">{action}</Td>
              <Td p="8px 10px 8px 10px">
                {keys.map((key) => (
                  <Kbd key={key} me={1}>
                    {key}
                  </Kbd>
                ))}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
