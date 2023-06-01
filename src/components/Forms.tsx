import { sizeFormDefaults } from "@/consts/form";
import { FormContents } from "@/types/form";
import { Box, Button, FormLabel, Input, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SizeForm } from "./SizeForm";

type Props = {
  isLoading: boolean
  setFormData: Dispatch<SetStateAction<FormContents | undefined>>
}

export default function Forms(props: Props) {
  const { isLoading, setFormData } = props
  const formMethods = useForm<FormContents>({
    defaultValues: {
      ...sizeFormDefaults,
      isFixed: true
    }
  });
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
          <Button type="submit" colorScheme={"cyan"} color={"white"} isLoading={isLoading}>
            生成
          </Button>
        </VStack>
      </form>
    </FormProvider>
  )
}
