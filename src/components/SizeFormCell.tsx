import adjusters from "@/foundations/adjusters";
import { FormContents, SizeFormContents, SizeFormItemData } from "@/types/form";
import { InputGroup, InputRightAddon, NumberInput, NumberInputField, Td } from "@chakra-ui/react";
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
        const target = values.isFixed ? item.adjust?.output : item.adjust?.thumbnail
        if (target === undefined) return
        const adjusted = adjusters[target](values)
        if (adjusted !== values[target]) setValue(target, adjusted, { shouldDirty: false })
    }, [item, field, getValues, setValue])

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
