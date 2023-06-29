import { FormContents } from "@/types/form";
import { Box, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function OptionsForm () {
  const { register } = useFormContext<FormContents>()

  return (
    <Box width={"100%"}>
      <FormLabel>
        背景色
        <Input type="color" {...register("option.background")} />
      </FormLabel>
    </Box>
  );
}
