import { sizeFormItemData, SIZE_FORM_LABELS } from "@/consts/form";
import fixFixedValues from "@/foundations/fixFixedValues";
import { FormContents, SizeFormItemData, SizeFormLabels } from "@/types/form";
import { Values } from "@/types/util";
import { zip } from "@/util/arrays";
import { Tbody, Tr, Td, Radio, InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import { useEffect } from "react";
import { Control, useFormContext, useWatch } from "react-hook-form";

type Props = {
    data: SizeFormItemData,
    fixed: SizeFormLabels | undefined,
    control: Control<FormContents, any>
}

const fieldNames = sizeFormItemData.flatMap(v => v.item).map(v => v.register)

export function SizeFormItem(props: Props) {
    const { data, fixed, control } = props
    const disabled = fixed === data.label
    const { register, getValues, setValue } = useFormContext<FormContents>()
    const registers = data.item.map(v => v.register);
    const watchFields = useWatch({ control, name: registers })

    useEffect(() => {
        const targetLabel = Object.values(SIZE_FORM_LABELS).find(v => ![fixed, data.label].includes(v))!
        const fieldValuesArr = getValues(fieldNames).map(Number)
        if (fieldValuesArr.some(v => isNaN(v))) return
        const fieldValues = Object.fromEntries(zip(fieldNames, fieldValuesArr)) as Record<Values<typeof fieldNames>, Values<typeof fieldValuesArr>>
        const fixedFixedValue = fixFixedValues[targetLabel](fieldValues)
        for (const [target, value] of Object.entries(fixedFixedValue) as [Values<typeof fieldNames>, number][]) {
            if (fieldValues[target] !== value) setValue(target, String(value))
        }
    }, [watchFields, data.label, fixed, getValues, setValue])

    return (
        <Tbody>
            <Tr>
                <Td colSpan={data.item.length ? 1 : 3}>
                    <Radio value={data.label}>{data.label}</Radio>
                </Td>
                {
                    data.item.map(v => (
                        <Td key={v.register}>
                            <InputGroup>
                                <Input {...v.inputProps} disabled={disabled} {...register(v.register)} />
                                <InputRightAddon>{v.prefix}</InputRightAddon>
                            </InputGroup>
                        </Td>
                    ))
                }
            </Tr>
        </Tbody>
    )
}
