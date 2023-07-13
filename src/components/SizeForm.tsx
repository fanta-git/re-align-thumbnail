import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { SizeFormCell } from "./SizeFormCell";

export default function SizeForm () {
  return (
    <TableContainer>
      <Table variant='simple' minW={"500px"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>横</Th>
            <Th>縦</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>グリッド数</Td>
            <SizeFormCell
              register={"columns"}
              prefix={"列"}
            />
            <SizeFormCell
              register={"rows"}
              prefix={"行"}
            />
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>出力画像</Td>
            <SizeFormCell
              register={"outputWidth"}
              prefix={"px"}
            />
            <SizeFormCell
              register={"outputHeight"}
              prefix={"px"}
            />
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
