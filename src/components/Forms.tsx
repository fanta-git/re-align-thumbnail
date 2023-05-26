import { sizeFormDefaults } from "@/consts/form";
import { FormContents } from "@/types/form";
import { Box, Button, FormLabel, Input, VStack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { SizeForm } from "./SizeForm";

type Props = {
  align: (data: FormContents) => Promise<void>
  isLoading: boolean
}

export default function Forms(props: Props) {
  const { align, isLoading } = props
  const formMethods = useForm<FormContents>({
    defaultValues: {
      ...sizeFormDefaults,
      isFixed: true
    }
  });
  const { handleSubmit, register } = formMethods

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(align)} style={{ width: "100%" }}>
        <VStack>
          <Box w={"100%"}>
            <FormLabel>KiiteプレイリストのURL</FormLabel>
            <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
          </Box>
          <SizeForm />
          <Button type="submit" colorScheme={"cyan"} color={"white"} isLoading={isLoading}>
            生成
          </Button>
        </VStack>
      </form>
    </FormProvider>
  )
}
