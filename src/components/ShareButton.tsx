import { alignedImageFileState, playlistBasesState } from "@/stores/playlist";
import { Button, Icon } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineIosShare } from "react-icons/md";
import { useRecoilValue } from "recoil";

type Props = {}

export default function ShareButton (props: Props) {
  const {  } = props
  const [canShare, setCanShare] = useState(false)
  const playlistBases = useRecoilValue(playlistBasesState)
  const file = useRecoilValue(alignedImageFileState)

  useEffect(() => {
    setCanShare(window.navigator.share != undefined)
  }, [])

  const onClick = useCallback(async () => {
    if (!file) return null
    const data: ShareData = {
      title: "Share",
      url: window.location.href,
      text: "Share text",
      files: [file]
    }
    if (!navigator.canShare(data)) return null
    try {
      await navigator.share(data)
    } catch (e) {
      console.log("canceled")
    }
  }, [file])

  if (!canShare) return null

  return (
    <Button size={"sm"} rightIcon={<Icon as={MdOutlineIosShare} />} colorScheme="blue" onClick={onClick}>
      シェア
    </Button>
  )
}
