import { useFetchListData } from "@/hooks/useFetchListData";
import { Box, FormLabel, Input } from "@chakra-ui/react";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

type FormContents = {
  url: string
}

export default function Forms() {
  const { register, watch } = useForm<FormContents>()
  const listUrl = watch("url")
  const fetchListData = useFetchListData()

  useEffect(() => {
    if (listUrl == null) return

    fetchListData(listUrl)
  }, [listUrl, fetchListData])

  return (
    <Box>
      <FormLabel>KiiteプレイリストのURL</FormLabel>
      <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
    </Box>
  )
}
