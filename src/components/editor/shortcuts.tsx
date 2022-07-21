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

const shortcutsData = [
  {
    action: "Play / Pause video",
    keys: ["space"],
  },
  {
    action: "create subtitle",
    keys: ["["],
  },
  {
    action: "cut subtitle",
    keys: ["]"],
  },
  {
    action: "split subtitle",
    keys: ["\\ or /"],
  },
  {
    action: "skip 0.5 seconds",
    keys: ["right arrow"],
  },
  {
    action: "skip back 0.5 seconds",
    keys: ["left arrow"],
  },
  {
    action: "Skip 5 seconds",
    keys: ["shift", "right"],
  },
  {
    action: "Skip back 5 seconds",
    keys: ["shift", "left"],
  },
  {
    action: "Insert a line break",
    keys: ["shift", "enter"],
  },
];

export default function Shortcuts() {
  return (
    <TableContainer h="full" overflowX="hidden">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th p="8px 10px 8px 10px">Action</Th>
            <Th p="8px 10px 8px 10px">Shortcut</Th>
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
