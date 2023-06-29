import { FormContents } from "@/types/form";
import { Box, Button, FormLabel, Input } from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function UrlForm () {
  const { register, control } = useFormContext<FormContents>()
  const { fields, append, remove } = useFieldArray({ control, name: "lists" })

  return (
    <Box w={"100%"}>
      <FormLabel>KiiteプレイリストのURL</FormLabel>
      {fields.map((field, index) => (
        <Input
          key={field.id}
          placeholder="https://kiite.jp/playlist/xxxxxxxxxxx"
          {...register(`lists.${index}.url`)}
        />
      ))}
      <Button onClick={() => remove(-1)}>remove</Button>
      <Button onClick={() => append({ url: "" })}>add</Button>
    </Box>
  );
}
