import { FormContents } from "@/types/form";
import { Box, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function UrlForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <Box w={"100%"}>
      <FormLabel>KiiteプレイリストのURL</FormLabel>
      <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("list.url")} />
    </Box>
  );
}
