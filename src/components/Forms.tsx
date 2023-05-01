import { sizeFormItemData, sizeFormItems } from "@/consts/form";
import { getImageUrl } from "@/foundations/getImageUrl";
import { imageUrlState, isImageLoadingState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { createObject } from "@/util/arrays";
import { Box, Button, FormLabel, Input, VStack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SizeForm } from "./SizeForm";

export default function Forms() {
  const sizeFormDefault = createObject(sizeFormItems.map(v => v.register), sizeFormItems.map(v => v.defaultValue))
  const formMethods = useForm<FormContents>({
    defaultValues: {
      ...sizeFormDefault,
      isFix: true
    }
  });
  const { handleSubmit, register } = formMethods
  const [isImageLoading, setIsImageLoading] = useRecoilState(isImageLoadingState)
  const setImageUrl = useSetRecoilState(imageUrlState)

  const onSubmit = (data: FormContents) => {
    const url = getImageUrl(data)
    if (url === undefined) return

    setIsImageLoading(true)
    setImageUrl(url)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <VStack>
          <Box w={"100%"}>
            <FormLabel>KiiteプレイリストのURL</FormLabel>
            <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
          </Box>
          <SizeForm />
          <Button type="submit" colorScheme={"cyan"} color={"white"} isLoading={isImageLoading}>
            生成
          </Button>
        </VStack>
      </form>
    </FormProvider>
  )
}
