import { formContentsDefaults } from "@/consts/form";
import { FormContents } from "@/types/form";
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { ButtonGroup, FormLabel, HStack, IconButton, Input, Spacer, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function UrlForm () {
  const { register, control } = useFormContext<FormContents>()
  const { fields, append, remove } = useFieldArray({ control, name: "lists" })
  const removeForm = useCallback(() => remove(-1), [remove])
  const appendForm = useCallback(() => append(formContentsDefaults.lists[0]), [append])
  const isRemoveDisabled = fields.length <= 1

  return (
    <VStack w="full">
      <HStack w="full">
        <FormLabel>リストのURL</FormLabel>
        <Spacer />
        <ButtonGroup isAttached variant="outline" size={"sm"}>
          <IconButton aria-label="remove-form" onClick={removeForm} isDisabled={isRemoveDisabled} icon={<MinusIcon />} />
          <IconButton aria-label="append-form" onClick={appendForm} icon={<AddIcon />} />
        </ButtonGroup>
      </HStack>

      <VStack spacing={1} w="full">
        {fields.map((field, index) => (
          <Input
            key={field.id}
            placeholder="https://kiite.jp/playlist/xxxxxxxxxxx"
            {...register(`lists.${index}.url`)}
          />
        ))}
      </VStack>
    </VStack>
  )
}
