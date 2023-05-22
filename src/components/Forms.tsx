import { sizeFormDefaults } from "@/consts/form";
import { getImageUrl } from "@/foundations/getImageUrl";
import { imageUrlState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Box, Button, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { SizeForm } from "./SizeForm";

export default function Forms() {
  const formMethods = useForm<FormContents>({
    defaultValues: {
      ...sizeFormDefaults,
      isFixed: true
    }
  });
  const { handleSubmit, register } = formMethods
  const [isImageLoading, setIsImageLoading] = useState<boolean>()
  const setImageUrl = useSetRecoilState(imageUrlState)

  const onSubmit = async (data: FormContents) => {
    try {
      setIsImageLoading(true)
      const url = await getImageUrl(data)
      if (url === undefined) return

      setImageUrl(url)
    } finally {
      setIsImageLoading(false)
    }
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
