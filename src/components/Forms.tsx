'use client'

import { fetchListData } from "@/foundations/fetchListData";
import { Box, FormLabel, Input } from "@chakra-ui/react";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

type FormContents = {
  url: string
}

export default function Forms() {
  const { register, watch } = useForm<FormContents>()
  const listUrl = watch("url")

  useEffect(() => {
    if (listUrl == null) return

    fetchListData(listUrl).then(console.log)
  }, [listUrl])

  return (
    <Box>
      <FormLabel>KiiteプレイリストのURL</FormLabel>
      <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
    </Box>
  )
}
