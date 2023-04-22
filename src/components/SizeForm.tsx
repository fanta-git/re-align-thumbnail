import { sizeFormHeads, sizeFormItemData, sizeFormItems } from "@/consts/form";
import fixFixedValues from "@/foundations/fixFixedValues";
import { FormContents } from "@/types/form";
import { createObject } from "@/util/arrays";
import { Input, InputGroup, InputRightAddon, Radio, RadioGroup, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const targets = sizeFormItems.map(v => v.register)

export function SizeForm () {
    const [fixed, setFixed] = useState(sizeFormItemData.length - 1)
    const { register, watch, setValue } = useFormContext<FormContents>()
    const watchFields = watch(targets)
    const oldField = useRef(watchFields)

    useEffect(() => {
        const currentCell = sizeFormItems.find((_, i) => watchFields[i] !== oldField.current[i])
        const fixedItem = sizeFormItemData[fixed]
        if (currentCell === undefined || fixedItem === undefined) return
        oldField.current = [...watchFields]

        const targetCell = sizeFormItems.find(v =>
            v.type === currentCell.type
            && v !== currentCell
            && !fixedItem.item.includes(v)
        )
        if (targetCell === undefined) return

        const targetName = targetCell.register
        const data = createObject(targets, watchFields)
        const modified = fixFixedValues[targetName](data)
        setValue(targetName, modified)
    }, [watchFields, fixed, setValue])

    return (
        <RadioGroup onChange={v => setFixed(Number(v))} value={String(fixed)}>
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
                                    <Radio value={String(i)}>{data.label}</Radio>
                                </Td>
                                {data.item.map(item => (
                                    <Td key={item.register}>
                                        <InputGroup>
                                            <Input {...item.inputProps} disabled={fixed === i} {...register(item.register)} />
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
