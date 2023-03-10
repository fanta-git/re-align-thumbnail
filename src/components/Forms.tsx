import { getListBase } from "@/foundations/getListBase";
import { isImageLoadingState, playlistBaseState } from "@/stores/playlist";
import { Box, Button, FormLabel, Input, VStack } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

type FormContents = {
  url: string
}

export default function Forms() {
  const { handleSubmit, register } = useForm<FormContents>()
  const setPlaylistBase = useSetRecoilState(playlistBaseState)
  const isImageLoading = useRecoilValue(isImageLoadingState)

  const onSubmit = (data: FormContents) => {
    const { url } = data
    if (url == null) return

    const base = getListBase(url)
    if (base === undefined) return
    setPlaylistBase(base)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <VStack>
        <Box w={"100%"}>
          <FormLabel>KiiteプレイリストのURL</FormLabel>
          <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
        </Box>
        <Button type="submit" colorScheme={"cyan"} color={"white"} isLoading={isImageLoading}>生成</Button>
      </VStack>
    </form>
  )
}
