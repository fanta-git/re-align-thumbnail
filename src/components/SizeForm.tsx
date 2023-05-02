import { sizeFormHeads, sizeFormItemData } from "@/consts/form";
import { FormContents } from "@/types/form";
import { Checkbox, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { SizeFormCell } from "./SizeFormCell";

export function SizeForm () {
    const { register } = useFormContext<FormContents>()

    return (
        <>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            {sizeFormHeads.map((v, i) => (<Th key={i}>{v}</Th>))}
                        </Tr>
                    </Thead>
                    {sizeFormItemData.map((data, i) => (
                        <Tbody key={i}>
                            <Tr>
                                <Td>{data.label}</Td>
                                {data.item.map((item, i) => (
                                    <SizeFormCell key={i} item={item} />
                                ))}
                            </Tr>
                        </Tbody>
                    ))}
                </Table>
            </TableContainer>
            <Checkbox {...register("isFixed")}>サムネイルのサイズを固定する</Checkbox>
        </>
    )
}
