import { FormContents } from "@/types/form";
import { Box, Checkbox } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function SettingForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <Box w={"100%"}>
      <Checkbox {...register("setting.isFixed")}>サムネイルサイズを固定</Checkbox>
    </Box>
  );
}
