import { sizeFormHeads, sizeFormItemData, sizeFormItems } from "@/consts/form";
import { FormContents } from "@/types/form";
import { Checkbox, Table, TableContainer, Th, Thead, Tr } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { SizeFormRow } from "./SizeFormRow";

const targets = sizeFormItems.map(v => v.register)

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
                        <SizeFormRow key={i} data={data} />
                    ))}
                </Table>
            </TableContainer>
            <Checkbox {...register("isFix")}>サムネイルのサイズを固定する</Checkbox>
        </>
    )
}
