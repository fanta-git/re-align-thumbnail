import { SIZE_FORM_LABELS } from "@/consts/form";
import { FormContents, SizeFormContents, SizeFormItemData } from "@/types/form";
import { orgRound } from "@/util/number";
import { InputGroup, InputRightAddon, NumberInput, NumberInputField, Tbody, Td, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type Props = {
    item: SizeFormItemData["item"][number]
}

export function SizeFormCell (props: Props) {
    const { item } = props
    const { control, getValues, setValue } = useFormContext<FormContents>()
    const field = useWatch<SizeFormContents>({ name: item.register })

    useEffect(() => {
        const values = getValues()
        if (values.isFixed) {
            if (item.register === "columns") {
                const outputWidth = orgRound(values.columns * values.width, 2)
                if (outputWidth !== values.outputWidth) setValue("outputWidth", outputWidth)
            } else if (item.register === "rows") {
                const outputHeight = orgRound(values.rows * values.height, 2)
                if (outputHeight !== values.outputHeight) setValue("outputHeight", outputHeight)
            } else if (item.register === "outputWidth") {
                const columns = orgRound(values.outputWidth / values.width)
                if (columns !== values.columns) setValue("columns", columns)
            } else if (item.register === "outputHeight") {
                const rows = orgRound(values.outputHeight / values.height)
                if (rows !== values.rows) setValue("rows", rows)
            }
        } else {
            if (item.register === "outputWidth" || item.register === "columns") {
                const width = orgRound(values.outputWidth / values.columns, 2)
                if (width !== values.width) setValue("width", width)
            } else if (item.register === "outputHeight" || item.register === "rows") {
                const height = orgRound(values.outputHeight / values.rows, 2)
                if (height !== values.height) setValue("height", height)
            }
        }
    }, [item.register, field, getValues, setValue])

    return (
        <Td key={item.register}>
            <Controller
                name={item.register}
                control={control}
                render={({ field: { ref, ...restField } }) => (
                    <NumberInput {...restField} {...item.inputProps}>
                        <InputGroup>
                            <NumberInputField
                                onChange={e => setValue(item.register, parseInt(e.target.value))}
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
    )
}
