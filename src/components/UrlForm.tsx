import { FormContents } from "@/types/form";
import { FormLabel, HStack, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

export default function UrlForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <VStack w="full">
      <HStack w="full">
        <FormLabel>リストのURL</FormLabel>
      </HStack>
      <AutoResizeTextarea
        minRows={1}
        placeholder="https://kiite.jp/playlist/xxxxxxxxxxx"
        {...register(`list.urls`)}
      />
    </VStack>
  )
}
