import { Textarea, forwardRef } from "@chakra-ui/react";
import { FC } from "react";
import ResizeTextarea, { TextareaAutosizeProps } from "react-textarea-autosize";

export const AutoResizeTextarea: FC<TextareaAutosizeProps> = forwardRef((props, ref) => (
  <Textarea
    minH="unset"
    overflow="hidden"
    w="100%"
    resize="none"
    ref={ref}
    minRows={3}
    as={ResizeTextarea}
    {...props}
  />
))
