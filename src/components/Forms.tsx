import { sizeFormDefaults } from "@/consts/form";
import useWatchCallback from "@/hooks/useFormWatchCallback";
import { FormContents } from "@/types/form";
import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import OptionsForm from "./OptionsForm";
import SizeForm from "./SizeForm";
import UrlForm from "./UrlForm";
import { WatchWithDefault } from "@/types/reactHookForm";
import SettingForm from "./SettingForm";

export default function Forms() {
  const formMethods = useForm<FormContents>({ defaultValues: sizeFormDefaults })
  const { watch } = formMethods
  const formSubscribe = useWatchCallback(formMethods)

  useEffect(() => {
    const subscribe = (watch as WatchWithDefault<typeof watch>)(formSubscribe)
    return subscribe.unsubscribe
  }, [watch, formSubscribe])

  return (
    <FormProvider {...formMethods}>
      <form style={{ width: "100%" }}>
        <VStack>
          <UrlForm />
          <SizeForm />
          <SettingForm />
          <OptionsForm />
        </VStack>
      </form>
    </FormProvider>
  )
}
