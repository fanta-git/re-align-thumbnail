import useSizeFormStep from "@/hooks/useSizeFormStep";
import { FormContents } from "@/types/form";
import { InputGroup, InputRightAddon, NumberInput, NumberInputField, NumberInputProps, Td } from "@chakra-ui/react";
import { Controller, FieldPath, useFormContext } from "react-hook-form";

type Props = {
  register: FieldPath<FormContents["size"]>
  prefix: string
  inputProps?: NumberInputProps
}

export function SizeFormCell (props: Props) {
  const { register, prefix, inputProps } = props
  const name = `size.${register}` as const
  const step = useSizeFormStep(register)
  const { control } = useFormContext<FormContents>()

  return (
    <Td key={register}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, onChange, ...restField } }) => (
          <NumberInput
            {...restField}
            {...inputProps}
            step={step}
            min={0}
            isValidCharacter={s => /\d+/.test(s)}
            onChange={(_, v) => onChange(isNaN(v) ? 0 : v)}
          >
            <InputGroup>
              <NumberInputField
                ref={ref}
                name={restField.name}
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
