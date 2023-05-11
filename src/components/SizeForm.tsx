import { FormContents } from "@/types/form";
import { Checkbox, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { SizeFormCell } from "./SizeFormCell";

export function SizeForm () {
    const { register, watch } = useFormContext<FormContents>()
    const [isFixed, width, height] = watch(["isFixed", "width", "height"])

    return (
        <>
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
                                adjust={{ output: "outputWidth", thumbnail: "width" }}
                                inputProps={{ min: 1, step: 1, precision: 0 }}
                            />
                            <SizeFormCell
                                register={"rows"}
                                prefix={"行"}
                                adjust={{ output: "outputHeight", thumbnail: "height" }}
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
                                adjust={{ output: "columns", thumbnail: "width" }}
                                inputProps={{ min: 160, step: isFixed ? width : 10, precision: 0 }}
                            />
                            <SizeFormCell
                            register={"outputHeight"}
                            prefix={"px"}
                            adjust={{ output: "rows", thumbnail: "height" }}
                            inputProps={{ min: 90, step: isFixed ? height : 10, precision: 0 }}
                        />
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Checkbox {...register("isFixed")}>サムネイルのサイズを固定する</Checkbox>
        </>
    )
}
