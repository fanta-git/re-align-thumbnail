import { optionFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSetRecoilState } from "recoil";

export default function useSaveOption(formMethods: UseFormReturn<FormContents, any, undefined>, onClose: () => void) {
    const { getValues } = formMethods
    const setOption = useSetRecoilState(optionFormContentsState)

    return useCallback(() => {
        const option = getValues("option")
        setOption({ ...option })
        onClose()
    }, [getValues, onClose, setOption])
}
