import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ResRankingUser } from "../../utils/types";
import RankPagination from "./rankPagination";

type Props = {
  users: ResRankingUser;
};

export default function UserRankTable({ users }: Props) {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Title", "Language", "Requests", "Points"];
  const [pageIndex, gotoPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageCount, setPageCount] = useState<number>(100);
  useEffect(() => {
    setPageCount(Math.floor((users.length + pageSize - 1) / pageSize));
  }, [pageSize, users]);
  const handleSelectSize = (size: number) => {
    setPageSize(size);
    setPageCount(Math.floor((users.length + size - 1) / size));
  };
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Show {pageSize}
        </MenuButton>
        <MenuList>
          {[10, 20, 30, 40, 50].map((item) => (
            <MenuItem key={item} onClick={() => handleSelectSize(item)}>
              Show {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Box
        pl={{ base: "10px", lg: "30px", xl: "70px" }}
        pr={{ base: "10px", lg: "30px", xl: "70px" }}
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" ps="0px">
              {captions.map((caption, idx) => {
                return (
                  <Th
                    color="gray.400"
                    key={idx}
                    fontWeight="bold"
                    fontSize={{ base: "15px", md: "20px" }}
                  >
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
        </Table>
      </Box>
      <RankPagination
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageSize={pageSize}
      />
    </>
  );
}
