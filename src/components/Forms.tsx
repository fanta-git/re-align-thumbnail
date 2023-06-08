import { formContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { WatchWithDefault } from "@/types/reactHookForm";
import { Box, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SizeForm } from "./SizeForm";

export default function Forms() {
  const [formData, setFormData] = useRecoilState(formContentsState)
  const formMethods = useForm<FormContents>({ defaultValues: formData });
  const { handleSubmit, register, watch } = formMethods

  useEffect(() => {
    const { unsubscribe } = (watch as WatchWithDefault<typeof watch>)((fields, { name }) => {
      if (name === undefined) return
      setFormData(fields)
      console.log(name, fields)
    })

    return unsubscribe
  }, [watch, setFormData])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(setFormData)} style={{ width: "100%" }}>
        <VStack>
          <Box w={"100%"}>
            <FormLabel>KiiteプレイリストのURL</FormLabel>
            <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
          </Box>
          <SizeForm />
        </VStack>
      </form>
    </FormProvider>
  )
}
