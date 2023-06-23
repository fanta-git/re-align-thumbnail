import updateValues from "@/foundations/updateValues";
import { formContentsSelector } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Splited, WatchWithDefault } from "@/types/reactHookForm";
import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import OptionsForm from "./OptionsForm";
import SizeForm from "./SizeForm";
import UrlForm from "./UrlForm";

export default function Forms() {
  const formData = useRecoilValue(formContentsSelector)
  const formMethods = useForm<FormContents>({ defaultValues: formData })
  const { watch, getValues, setValue } = formMethods

  useEffect(() =>
    (watch as WatchWithDefault<typeof watch>)((data, { name }) => {
      if (name === undefined) return
      const [group, item] = name.split(".") as Splited<typeof name>

      if (group === "size" && item !== undefined) {
        const isFixed = getValues("option.isFixed")
        const updated = updateValues(data.size, item, isFixed)
        if (updated !== undefined) setValue("size", updated)
      }
    }).unsubscribe
  , [watch, getValues, setValue])

  return (
    <FormProvider {...formMethods}>
      <form style={{ width: "100%" }}>
        <VStack>
          <UrlForm />
          <SizeForm />
          <OptionsForm />
        </VStack>
      </form>
    </FormProvider>
  )
}
