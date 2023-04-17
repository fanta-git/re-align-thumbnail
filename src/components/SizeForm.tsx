import { sizeFormHeads, sizeFormItemData } from "@/consts/form";
import { FormContents, SizeFormLabels } from "@/types/form";
import { RadioGroup, Table, TableContainer, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SizeFormItem } from "./SizeFormItem";

export function SizeForm () {
    const [fixed, setFixed] = useState<SizeFormLabels>()
    const { control } = useFormContext<FormContents>()

    useEffect(() => {
        setFixed(sizeFormItemData.at(-1)!.label)
    }, [])

    return (
        <RadioGroup onChange={(v: SizeFormLabels) => setFixed(v)} value={fixed}>
            <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        {sizeFormHeads.map((v, i) => (<Th key={i}>{v}</Th>))}
                    </Tr>
                </Thead>
                {sizeFormItemData.map((v, i) => <SizeFormItem key={i} data={v} fixed={fixed} control={control} />)}
            </Table>
            </TableContainer>
        </RadioGroup>
    )
}
