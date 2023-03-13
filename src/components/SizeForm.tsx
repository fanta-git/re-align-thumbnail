import { sizeFormItemData, sizeFormHeads } from "@/consts/form";
import { RadioGroup, TableContainer, Table, Thead, Tr, Th } from "@chakra-ui/react";
import { useState } from "react";
import { SizeFormItem } from "./SizeFormItem";

export function SizeForm () {
    const [value, setValue] = useState('2')

    return (
        <RadioGroup onChange={setValue} value={value}>
            <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        {sizeFormHeads.map((v, i) => (<Th key={i}>{v}</Th>))}
                    </Tr>
                </Thead>
                {sizeFormItemData.map((v, i) => <SizeFormItem key={i} data={v} index={i} />)}
            </Table>
            </TableContainer>
        </RadioGroup>
    )
}
