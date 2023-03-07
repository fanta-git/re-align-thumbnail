import { playlistIdState } from "@/stores/playlist";
import { Box, FormLabel, Input } from "@chakra-ui/react";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

type FormContents = {
  url: string
}

export default function Forms() {
  const { register, watch } = useForm<FormContents>()
  const listUrl = watch("url")
  const setPlaylistId = useSetRecoilState(playlistIdState)

  useEffect(() => {
    if (listUrl == null) return

    setPlaylistId(listUrl)
  }, [listUrl, setPlaylistId])

  return (
    <Box>
      <FormLabel>KiiteプレイリストのURL</FormLabel>
      <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
    </Box>
  )
}
