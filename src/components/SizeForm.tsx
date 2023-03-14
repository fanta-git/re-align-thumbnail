import { fieldNames, sizeFormHeads, sizeFormItemData } from "@/consts/form";
import setFixedValue from "@/foundations/fixFixedValues";
import { FormContents, SizeFormValues } from "@/types/form";
import { zip } from "@/util/arrays";
import { RadioGroup, Table, TableContainer, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SizeFormItem } from "./SizeFormItem";

export function SizeForm () {
    const [fixed, setFixed] = useState('3')
    const { watch, setValue } = useFormContext<FormContents>()
    const watchFields = watch(fieldNames)

    useEffect(() => {
        const sizeFormValues = Object.fromEntries(zip(fieldNames, watchFields.map(Number))) as SizeFormValues
        const fixedFixedValue = setFixedValue[fixed as '0' | '1' | '2' | '3'](sizeFormValues)
        console.log(fixedFixedValue);
        for (const [target, value] of Object.entries(fixedFixedValue) as [typeof fieldNames[number], number][]) {
            if (sizeFormValues[target] !== value) setValue(target, String(value))
        }
    }, [watchFields, fixed, setValue])

    return (
        <RadioGroup onChange={setFixed} value={fixed}>
            <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        {sizeFormHeads.map((v, i) => (<Th key={i}>{v}</Th>))}
                    </Tr>
                </Thead>
                {sizeFormItemData.map((v, i) => <SizeFormItem key={i} data={v} index={i} disabled={fixed === String(i)} />)}
            </Table>
            </TableContainer>
        </RadioGroup>
    )
}
