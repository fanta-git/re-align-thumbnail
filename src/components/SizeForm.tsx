import { settingFormContentsState } from "@/stores/playlist";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { SizeFormCell } from "./SizeFormCell";

export default function SizeForm () {
  const { thumbnailHeight, thumbnailWidth, isFixed } = useRecoilValue(settingFormContentsState)

  return (
    <TableContainer>
      <Table variant='simple'>
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
              register={"size.columns"}
              prefix={"列"}
              inputProps={{ min: 1, step: 1, precision: 0 }}
            />
            <SizeFormCell
              register={"size.rows"}
              prefix={"行"}
              inputProps={{ min: 1, step: 1, precision: 0 }}
            />
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>出力画像</Td>
            <SizeFormCell
              register={"size.outputWidth"}
              prefix={"px"}
              inputProps={{ min: 160, step: isFixed ? thumbnailWidth : 10, precision: 0 }}
            />
            <SizeFormCell
              register={"size.outputHeight"}
              prefix={"px"}
              inputProps={{ min: 90, step: isFixed ? thumbnailHeight : 10, precision: 0 }}
            />
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
