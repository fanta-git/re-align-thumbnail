import { FormContents } from "@/types/form";
import { Box, Checkbox } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function OptionsForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <Box width={"100%"}>
      <Checkbox {...register("option.isFixed")}>サムネイルのサイズを固定する</Checkbox>
    </Box>
  );
}
