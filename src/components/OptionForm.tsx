import { IMAGE_MIMETYPE } from "@/consts/image";
import { FormContents } from "@/types/form";
import { FormControl, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import PresetButtons from "./PresetButtons";

export default function OptionForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <Stack spacing={3} w={"100%"}>
      <FormControl>
        <FormLabel>サイズのプリセット</FormLabel>
        <PresetButtons />
      </FormControl>

      <FormControl>
        <FormLabel>背景色</FormLabel>
        <Input type="color" {...register("option.background")} />
      </FormControl>

      <FormControl>
        <FormLabel>ファイル形式</FormLabel>
        <Select {...register("option.fileType")}>
          {IMAGE_MIMETYPE.map((v, i) =>
            <option key={i} value={v}>{v}</option>
          )}
        </Select>
      </FormControl>
    </Stack>
  );
}
