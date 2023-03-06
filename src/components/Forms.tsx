'use client'

import { FormLabel, Input } from "@chakra-ui/react";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

type FormContents = {
  url: string
}

export default function Forms() {
  const { register, handleSubmit, watch } = useForm<FormContents>()
  const onSubmit = (data: FormContents) => {
    console.log(data)
  }
  const data = watch();
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>KiiteプレイリストのURL</FormLabel>
      <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
    </form>
  )
}
