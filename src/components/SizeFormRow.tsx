import { SIZE_FORM_LABELS } from "@/consts/form";
import { FormContents, SizeFormContents, SizeFormItemData } from "@/types/form";
import { orgRound } from "@/util/number";
import { InputGroup, InputRightAddon, NumberInput, NumberInputField, Tbody, Td, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type Props = {
    data: SizeFormItemData
}

export function SizeFormRow (props: Props) {
    const { data } = props
    const { control, getValues, setValue } = useFormContext<FormContents>()
    const name = data.item.map(v => v.register)
    const fields = useWatch<SizeFormContents>({ name })

    useEffect(() => {
        const values = getValues()
        if (values.isFixed) {
            if (data.label === SIZE_FORM_LABELS.GRID) {
                const outputWidth = orgRound(values.width * values.columns, 2)
                const outputHeight = orgRound(values.height * values.rows, 2)
                if (outputWidth !== values.outputWidth) setValue("outputWidth", outputWidth)
                if (outputHeight !== values.outputHeight) setValue("outputHeight", outputHeight)
            } else if (data.label === SIZE_FORM_LABELS.OUTPUT) {
                const columns = orgRound(values.outputWidth / values.width)
                const rows = orgRound(values.outputHeight / values.height)
                if (columns !== values.columns) setValue("columns", columns)
                if (rows !== values.rows) setValue("rows", rows)
            }
        } else {
            const width = orgRound(values.outputWidth / values.columns, 2)
            const height = orgRound(values.outputHeight / values.rows, 2)
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
                        <Controller
                            name={item.register}
                            control={control}
                            render={({ field: { ref, ...restField } }) => (
                                <NumberInput {...restField} {...item.inputProps}  >
                                    <InputGroup>
                                        <NumberInputField
                                            onChange={(event) => {
                                                restField.onChange(parseInt(event.target.value))
                                                setValue(item.register, parseInt(event.target.value))
                                            }}
                                            ref={ref}
                                            name={restField.name}
                                            borderRightRadius={0}
                                        />
                                        <InputRightAddon>{item.prefix}</InputRightAddon>
                                    </InputGroup>
                                </NumberInput>
                            )}
                        />
                    </Td>
                ))}
            </Tr>
        </Tbody>
    )
}
