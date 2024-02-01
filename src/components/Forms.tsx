import { formContentsDefaults } from "@/consts/form";
import useWatchCallback from "@/hooks/useFormWatchCallback";
import { FormContents } from "@/types/form";
import { WatchWithDefault } from "@/types/reactHookForm";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import OptionModalButton from "./OptionModalButton";
import SettingForm from "./SettingForm";
import SizeForm from "./SizeForm";
import UrlForm from "./UrlForm";
import ShareButton from "./ShareButton";

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
          <UrlForm />
          <SizeForm />
          <SettingForm />
          <HStack w={"100%"}>
            <OptionModalButton formMethods={formMethods} />
            <Spacer />
            <ShareButton />
          </HStack>
        </VStack>
      </form>
    </FormProvider>
  )
}
