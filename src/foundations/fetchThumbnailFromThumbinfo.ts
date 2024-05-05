import { thumbinfoXmlSchema } from "@/consts/schema"
import axios from "axios"
import formatThumbnailUrl from "./formatThumbnailUrl"
import { parseThumbnailUrl } from "./parseThumbnailUrl"

export const fetchThumbnailFromThumbinfo = async (videoId: string) => {
  const response = await axios.get<unknown>(`/api/nicoThumbinfo/${videoId}`)

  const parsed = thumbinfoXmlSchema.parse(response.data)
  const urls = formatThumbnailUrl(parsed.nicovideo_thumb_response.thumb.thumbnail_url)
  const thumbnail = await parseThumbnailUrl(urls)

  return thumbnail
}