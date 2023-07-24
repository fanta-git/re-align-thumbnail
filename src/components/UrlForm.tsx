import { FormContents } from "@/types/form";
import { FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

export default function UrlForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <VStack w="full">
      <FormControl>
        <FormLabel>リストのURL（複数可）</FormLabel>
        <AutoResizeTextarea
          minRows={2}
          placeholder="Kiite, ニコニコ動画, YouTube, VocaDBのリストに対応しています"
          {...register(`list.urls`)}
        />
      </FormControl>
    </VStack>
  )
}
