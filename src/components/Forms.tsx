'use client'

import { FormLabel, Input } from "@chakra-ui/react";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

type FormContents = {
  url: string
}

const r = (raw: TemplateStringsArray, ...substitutions: any[]) => new RegExp(String.raw(raw, ...substitutions))
export default function Forms() {
  const { register, watch } = useForm<FormContents>()
  const listUrl = watch("url")

  useEffect(() => {
    if (listUrl == null) return

    const [, listId] = listUrl.match(r`https://kiite.jp/playlist/(\w{10})`) ?? []
    if (listId === undefined) return
    console.log(listId);

    fetch(`/@cafeapi/playlists/contents/detail?list_id=${listId}`)
      .then(v => v.json())
      .then(v => console.log(v))
      .catch(v => console.error(v))

    console.log(listUrl)
  }, [listUrl])

  return (
    <form>
      <FormLabel>KiiteプレイリストのURL</FormLabel>
      <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
    </form>
  )
}
