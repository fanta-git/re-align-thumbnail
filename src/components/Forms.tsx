import { sizeFormDefaults } from "@/consts/form";
import useWatchCallback from "@/hooks/useFormWatchCallback";
import useSaveOption from "@/hooks/useSaveOption";
import { FormContents } from "@/types/form";
import { WatchWithDefault } from "@/types/reactHookForm";
import { Button, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import OptionModal from "./OptionModal";
import SettingForm from "./SettingForm";
import SizeForm from "./SizeForm";
import UrlForm from "./UrlForm";

export default function Forms() {
  const formMethods = useForm<FormContents>({ defaultValues: sizeFormDefaults })
  const { watch } = formMethods
  const { isOpen, onOpen, onClose } = useDisclosure()
  const formSubscribe = useWatchCallback(formMethods)
  const saveOption = useSaveOption(formMethods, onClose)

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
          <HStack width="100%">
            <Button size={"sm"} onClick={onOpen}>オプション設定</Button>
          </HStack>
        </VStack>

        <OptionModal isOpen={isOpen} saveOption={saveOption} />
      </form>
    </FormProvider>
  )
}
