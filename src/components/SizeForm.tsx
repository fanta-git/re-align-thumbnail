import { FormContents } from "@/types/form";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { SizeFormCell } from "./SizeFormCell";

export default function SizeForm () {
  const { control } = useFormContext<FormContents>()
  const [size, isFixed] = useWatch({ name: ["size", "option.isFixed"], control })

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
              inputProps={{ min: 160, step: isFixed ? size.thumbnailWidth : 10, precision: 0 }}
            />
            <SizeFormCell
              register={"size.outputHeight"}
              prefix={"px"}
              inputProps={{ min: 90, step: isFixed ? size.thumbnailHeight : 10, precision: 0 }}
            />
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
