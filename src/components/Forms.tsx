import { formContentsSelector } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { VStack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import OptionsForm from "./OptionsForm";
import SizeForm from "./SizeForm";
import UrlForm from "./UrlForm";

export default function Forms() {
  const formData = useRecoilValue(formContentsSelector)
  const formMethods = useForm<FormContents>({ defaultValues: formData })

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
