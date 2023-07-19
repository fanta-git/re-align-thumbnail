import { FormContents } from "@/types/form";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import OptionsForm from "./OptionForm";
import { optionFormContentsState } from "@/stores/playlist";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

type Props = {
  formMethods: UseFormReturn<FormContents, any, undefined>
}

export default function OptionModalButton (props: Props) {
  const { formMethods } = props
  const { getValues } = formMethods
  const { isOpen, onOpen, onClose } = useDisclosure()
  const setOption = useSetRecoilState(optionFormContentsState)

  const saveOption = useCallback(() => {
      const option = getValues("option")
      setOption({ ...option })
      onClose()
  }, [getValues, onClose, setOption])

  return (
    <>
      <Button size={"sm"} onClick={onOpen}>オプション設定</Button>

      <Modal onClose={saveOption} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>オプション設定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OptionsForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
