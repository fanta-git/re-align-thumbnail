import { IMAGE_MIMETYPE } from "@/consts/image";
import { FormContents } from "@/types/form";
import { FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import PresetButtons from "./PresetButtons";

export default function OptionForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <Stack spacing={3} w={"100%"}>
      <FormLabel>
        背景色
        <Input type="color" {...register("option.background")} />
      </FormLabel>
      <FormLabel>
        ファイル形式
        <Select {...register("option.fileType")}>
          {IMAGE_MIMETYPE.map((v, i) =>
            <option key={i} value={v}>{v}</option>
          )}
        </Select>
      </FormLabel>
      <FormLabel>
        プリセット<br/>
        <PresetButtons />
      </FormLabel>
    </Stack>
  );
}
