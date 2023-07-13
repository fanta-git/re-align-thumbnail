import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { SizeFormInput } from "./SizeFormInput";

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
            <Td><SizeFormInput register={"columns"} prefix={"列"} /></Td>
            <Td><SizeFormInput register={"rows"} prefix={"行"} /></Td>
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>出力画像</Td>
            <Td><SizeFormInput register={"outputWidth"} prefix={"px"} /></Td>
            <Td><SizeFormInput register={"outputHeight"} prefix={"px"} /></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
