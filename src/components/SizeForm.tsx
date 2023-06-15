import { FormContents } from "@/types/form";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { SizeFormCell } from "./SizeFormCell";

export default function SizeForm () {
  const { control } = useFormContext<FormContents>()
  const [isFixed, thumbnailWidth, thumbnailHeight] = useWatch({
    control,
    name: ["isFixed", "thumbnailWidth", "thumbnailHeight"]
  })

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
              register={"columns"}
              prefix={"列"}
              inputProps={{ min: 1, step: 1, precision: 0 }}
            />
            <SizeFormCell
              register={"rows"}
              prefix={"行"}
              inputProps={{ min: 1, step: 1, precision: 0 }}
            />
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>出力画像</Td>
            <SizeFormCell
              register={"outputWidth"}
              prefix={"px"}
              inputProps={{ min: 160, step: isFixed ? thumbnailWidth : 10, precision: 0 }}
            />
            <SizeFormCell
              register={"outputHeight"}
              prefix={"px"}
              inputProps={{ min: 90, step: isFixed ? thumbnailHeight : 10, precision: 0 }}
            />
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
