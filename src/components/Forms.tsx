import { getListBase } from "@/foundations/getListBase";
import { currentPlaylistBaseState } from "@/stores/playlist";
import { Box, Button, ButtonGroup, FormLabel, HStack, Input, Spacer, VStack } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

type FormContents = {
  url: string
}

export default function Forms() {
  const { handleSubmit, register } = useForm<FormContents>()
  const setPlaylistBase = useSetRecoilState(currentPlaylistBaseState)

  const onSubmit = (data: FormContents) => {
    const { url } = data
    if (url == null) return

    const base = getListBase(url)
    setPlaylistBase(base)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <VStack>
        <Box w={"100%"}>
          <FormLabel>KiiteプレイリストのURL</FormLabel>
          <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
        </Box>
        <Button type="submit" colorScheme={"cyan"} color={"white"}>生成</Button>
      </VStack>
    </form>
  )
}
