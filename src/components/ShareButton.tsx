import { Button, Icon } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineIosShare } from "react-icons/md";

type Props = {}

export default function ShareButton (props: Props) {
  const {  } = props
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare(window.navigator.share != undefined)
  }, [])

  const onClick = useCallback(async () => {
    const data: ShareData = {
      title: "Share",
      url: window.location.href,
      text: "Share text",
    }
    if (!navigator.canShare(data)) return null
    await navigator.share(data)
  }, [])

  if (!canShare) return null

  return (
    <Button size={"sm"} rightIcon={<Icon as={MdOutlineIosShare} />} colorScheme="blue" onClick={onClick}>
      シェア
    </Button>
  )
}
