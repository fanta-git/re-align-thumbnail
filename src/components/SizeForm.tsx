import { sizeFormHeads, sizeFormItemData, sizeFormItems } from "@/consts/form";
import fixFixedValues from "@/foundations/fixFixedValues";
import { FormContents, SizeFormLabels } from "@/types/form";
import { createObject } from "@/util/arrays";
import { Input, InputGroup, InputRightAddon, Radio, RadioGroup, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const targets = Object.keys(fixFixedValues) as (keyof typeof fixFixedValues)[]

export function SizeForm () {
    const [fixed, setFixed] = useState<SizeFormLabels>(sizeFormItemData.at(-1)!.label)
    const { register, watch, setValue } = useFormContext<FormContents>()
    const watchFields = watch(targets)
    const oldField = useRef<string[]>([])

    useEffect(() => {
        const changedIndex = watchFields.findIndex((v, i) => v !== oldField.current[i])
        if (changedIndex === -1) return
        oldField.current = [...watchFields]

        const currentCell = sizeFormItems.find(v => v.register === targets[changedIndex])
        if (currentCell === undefined) return

        const fixedItem = sizeFormItemData.find(v => v.label === fixed)
        const fixedCell = fixedItem?.item.find(v => v.type === currentCell.type)
        if (fixedCell === undefined) return

        const targetCell = sizeFormItems.find(v => (v.type === currentCell.type) && ![currentCell, fixedCell].includes(v))
        if (targetCell === undefined) return

        const targetName = targetCell.register
        const data = createObject(targets, watchFields)
        const modified = fixFixedValues[targetName](data)
        setValue(targetName, modified)
    }, [watchFields, fixed, setValue])

    return (
        <RadioGroup onChange={(v: SizeFormLabels) => setFixed(v)} value={fixed}>
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
                                <Td>
                                    <Radio value={data.label}>{data.label}</Radio>
                                </Td>
                                {data.item.map(item => (
                                    <Td key={item.register}>
                                        <InputGroup>
                                            <Input {...item.inputProps} disabled={fixed === data.label} {...register(item.register)} />
                                            <InputRightAddon>{item.prefix}</InputRightAddon>
                                        </InputGroup>
                                    </Td>
                                ))}
                            </Tr>
                        </Tbody>
                    ))}
                </Table>
            </TableContainer>
        </RadioGroup>
    )
}
