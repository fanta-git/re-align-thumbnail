import { formContentsDefaults } from "@/consts/form";
import useWatchCallback from "@/hooks/useFormWatchCallback";
import { FormContents } from "@/types/form";
import { WatchWithDefault } from "@/types/reactHookForm";
import { HStack, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import OptionModalButton from "./OptionModalButton";
import SettingForm from "./SettingForm";
import SizeForm from "./SizeForm";
import UrlForm from "./UrlForm";

export default function Forms() {
  const formMethods = useForm<FormContents>({ defaultValues: formContentsDefaults })
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
          <p style={{ color: 'red' }}>
            現在、ニコニコ動画の仕様変更によりマイリストからの読み込みが利用できません
          </p>
          <UrlForm />
          <SizeForm />
          <SettingForm />
          <HStack w={"100%"}>
            <OptionModalButton formMethods={formMethods} />
          </HStack>
        </VStack>
      </form>
    </FormProvider>
  )
}
