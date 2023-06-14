import { FormContents, SizeFormContents } from "@/types/form";
import { InputGroup, InputRightAddon, NumberInput, NumberInputField, NumberInputProps, Td } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  register: keyof SizeFormContents
  prefix: string
  inputProps?: NumberInputProps
}

export function SizeFormCell (props: Props) {
  const { register, prefix, inputProps } = props
  const { control } = useFormContext<FormContents>()

  return (
    <Td key={register}>
      <Controller
        name={register}
        control={control}
        render={({ field: { ref, onChange, ...restField } }) => (
          <NumberInput
            {...restField}
            {...inputProps}
            isValidCharacter={s => /\d+/.test(s)}
            clampValueOnBlur={false}
            onChange={(_, v) => onChange(v)}
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
