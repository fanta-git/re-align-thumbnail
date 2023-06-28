import { FormContents } from "@/types/form";
import { Box, Checkbox } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function SettingForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <Box width={"100%"}>
      <Checkbox {...register("setting.isFixed")}>サムネイルのサイズを固定する</Checkbox>
    </Box>
  );
}
