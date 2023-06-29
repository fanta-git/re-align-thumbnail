import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import OptionsForm from "./OptionForm";

type Props = {
  isOpen: boolean
  saveOption: () => void
}

export default function OptionModal (props: Props) {
  const { isOpen, saveOption } = props

  return (
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
  )
}
