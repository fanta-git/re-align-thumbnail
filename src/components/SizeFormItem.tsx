import { FormContents, SizeFormItemData } from "@/types/form";
import { Tbody, Tr, Td, Radio, InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Props = {
    data: SizeFormItemData,
    index: number,
    disabled: boolean
}

export function SizeFormItem(props: Props) {
    const { data, index, disabled } = props
    const { register } = useFormContext<FormContents>()

    return (
        <Tbody>
            <Tr>
                <Td>
                    <Radio value={String(index)}>{data.label}</Radio>
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
