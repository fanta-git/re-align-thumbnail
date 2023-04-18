import { FormContents, SizeFormItemData, SizeFormLabels } from "@/types/form";
import { Input, InputGroup, InputRightAddon, Radio, Tbody, Td, Tr } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

type Props = {
    data: SizeFormItemData,
    fixed: SizeFormLabels | undefined,
    register: UseFormRegister<FormContents>
}

export function SizeFormItem(props: Props) {
    const { data, fixed, register } = props
    const disabled = fixed === data.label

    return (
        <Tbody>
            <Tr>
                <Td>
                    <Radio value={data.label}>{data.label}</Radio>
                </Td>
                {data.item.map(item => (
                    <Td key={item.register}>
                        <InputGroup>
                            <Input {...item.inputProps} disabled={disabled} {...register(item.register)} />
                            <InputRightAddon>{item.prefix}</InputRightAddon>
                        </InputGroup>
                    </Td>
                ))}
            </Tr>
        </Tbody>
    )
}
