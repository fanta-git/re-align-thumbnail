import { SIZE_FORM_LABELS } from "@/consts/form";
import { FormContents, SizeFormContents, SizeFormItemData } from "@/types/form";
import { orgRound } from "@/util/number";
import { Input, InputGroup, InputRightAddon, Tbody, Td, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
    data: SizeFormItemData
}

const autoCompleteTargets = [SIZE_FORM_LABELS.GRID, SIZE_FORM_LABELS.OUTPUT]

export function SizeFormRow (props: Props) {
    const { data } = props
    const { register, getValues, setValue } = useFormContext<FormContents>()
    const name = data.item.map(v => v.register)
    const fields = useWatch<SizeFormContents>({ name })

    useEffect(() => {
        const values = getValues()
        if (values.isFix) {
            if (data.label === SIZE_FORM_LABELS.GRID) {
                const outputWidth = String(orgRound(+values.width * +values.columns, 2))
                const outputHeight = String(orgRound(+values.height * +values.rows, 2))
                if (outputWidth !== values.outputWidth) setValue("outputWidth", outputWidth)
                if (outputHeight !== values.outputHeight) setValue("outputHeight", outputHeight)
            } else if (data.label === SIZE_FORM_LABELS.OUTPUT) {
                const columns = String(orgRound(+values.outputWidth / +values.width))
                const rows = String(orgRound(+values.outputHeight / +values.height))
                if (columns !== values.columns) setValue("columns", columns)
                if (rows !== values.rows) setValue("rows", rows)
            }
        } else {
            const width = String(orgRound(+values.outputWidth / +values.columns, 2))
            const height = String(orgRound(+values.outputHeight / +values.rows, 2))
            if (width !== values.width) setValue("width", width)
            if (height !== values.height) setValue("height", height)
        }
    }, [data.label, fields, getValues, setValue])

    return (
        <Tbody>
            <Tr>
                <Td>{data.label}</Td>
                {data.item.map(item => (
                    <Td key={item.register}>
                        <InputGroup>
                            <Input {...item.inputProps} {...register(item.register)} />
                            <InputRightAddon>{item.prefix}</InputRightAddon>
                        </InputGroup>
                    </Td>
                ))}
            </Tr>
        </Tbody>
    )
}
