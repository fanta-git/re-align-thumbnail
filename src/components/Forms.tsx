import { formContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Box, Button, FormLabel, Input, VStack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SizeForm } from "./SizeForm";

export default function Forms() {
  const [formData, setFormData] = useRecoilState(formContentsState)
  const formMethods = useForm<FormContents>({ defaultValues: formData });
  const { handleSubmit, register } = formMethods

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(setFormData)} style={{ width: "100%" }}>
        <VStack>
          <Box w={"100%"}>
            <FormLabel>KiiteプレイリストのURL</FormLabel>
            <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
          </Box>
          <SizeForm />
          <Button type="submit" colorScheme={"cyan"} color={"white"}>
            生成
          </Button>
        </VStack>
      </form>
    </FormProvider>
  )
}
