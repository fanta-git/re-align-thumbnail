import { ThumbnailBase } from "@/types/playlist"
import axios from "axios"
import sharp from "sharp"

type Size = {
    width: number,
    height: number
}

export async function getBuffer(thumbnailBase: ThumbnailBase | undefined, size: Size) {
    const { width, height } = size
    if (thumbnailBase === undefined) return
    const { type, url } = thumbnailBase
    const res = await axios.get<Buffer>(url, { responseType: "arraybuffer" })
    const item = sharp(res.data)
    if (type === 'nicovideo') {
        const meta = await item.metadata()
        const widthOrigin = meta.width!
        const heightOrigin = meta.height!
        const heightNext =  widthOrigin * 9 / 16
        const top = (heightOrigin - heightNext) / 2
        item.extract({
            width: widthOrigin,
            height: heightNext | 0,
            top: top | 0,
            left: 0
        })
    }
    item.resize({ width, height })
    return item.toBuffer()
}
