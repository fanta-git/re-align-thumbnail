import updateValues from "@/foundations/updateValues";
import { formContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { WatchWithDefault } from "@/types/reactHookForm";
import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import OptionsForm from "./OptionsForm";
import { SizeForm } from "./SizeForm";
import UrlForm from "./UrlForm";

export default function Forms() {
  const [formData, setFormData] = useRecoilState(formContentsState)
  const formMethods = useForm<FormContents>({ values: formData })
  const { handleSubmit, watch } = formMethods

  useEffect(() => {
    const { unsubscribe } = (watch as WatchWithDefault<typeof watch>)((fields, { name }) => {
      const newData = updateValues(fields, name)
      if (newData) setFormData(newData)
    })

    return unsubscribe
  }, [watch, setFormData])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(setFormData)} style={{ width: "100%" }}>
        <VStack>
          <UrlForm />
          <SizeForm />
          <OptionsForm />
        </VStack>
      </form>
    </FormProvider>
  )
}
