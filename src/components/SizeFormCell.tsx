import { sizeFormDefaults } from "@/consts/form";
import adjusters from "@/foundations/adjusters";
import { FormContents, SizeFormContents } from "@/types/form";
import { InputGroup, InputRightAddon, NumberInput, NumberInputField, NumberInputProps, Td } from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type Props = {
    register: keyof SizeFormContents
    prefix: string
    adjust: Record<"output" | "thumbnail", keyof SizeFormContents>
    inputProps?: NumberInputProps
}

export function SizeFormCell (props: Props) {
    const { register, prefix, adjust, inputProps } = props
    const { control, getValues, setValue } = useFormContext<FormContents>()
    const field = useWatch<SizeFormContents>({ name: register })
    console.log(props);

    useEffect(() => {
        const values = getValues()
        console.log(values);
        const target = values.isFixed ? adjust.output : adjust.thumbnail
        if (target === undefined) return
        const adjusted = adjusters[target](values)
        if (adjusted !== values[target]) setValue(target, adjusted, { shouldDirty: false })
    }, [adjust, field, getValues, setValue])

    return (
        <Td key={register}>
            <Controller
                name={register}
                control={control}
                render={({ field: { ref, ...restField } }) => (
                    <NumberInput {...restField} {...inputProps}>
                        <InputGroup>
                            <NumberInputField
                                onChange={e => setValue(register, parseInt(e.target.value))}
                                ref={ref}
                                name={restField.name}
                                defaultValue={sizeFormDefaults[register]}
                                borderRightRadius={0}
                            />
                            <InputRightAddon>{prefix}</InputRightAddon>
                        </InputGroup>
                    </NumberInput>
                )}
            />
        </Td>
    )
}
