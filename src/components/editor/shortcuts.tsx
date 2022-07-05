import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Kbd,
} from "@chakra-ui/react";

const shortcutsData = [
  {
    action: "Play / Pause video",
    keys: ["tab"],
  },
  {
    action: "Skip back 2 seconds",
    keys: ["shift", "tab"],
  },
  {
    action: "Insert a line break",
    keys: ["shift", "enter"],
  },
];

export default function Shortcuts() {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Action</Th>
            <Th>Shortcut</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shortcutsData.map(({ action, keys }, index) => (
            <Tr key={index}>
              <Td>{action}</Td>
              <Td>
                {keys.map((key, index) => (
                  <Kbd key={index} me={1}>
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
