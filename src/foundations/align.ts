import { OptionFormContents, SizeFormContents } from "@/types/form"
import { PlaylistBase } from "@/types/playlist"
import { expansion, range, zip } from "@/util/arrays"
import { canvas2URL, createCanvas } from "@/util/canvas"
import fetchPlaylistMaster from "./fetchPlaylistMaster"
import { parseThumbnailUrl } from "./parseThumbnailUrl"

const RATIO_W = 16
const RATIO_H = 9


export default async function align (playlistBases: PlaylistBase[], size: SizeFormContents, option: OptionFormContents) {
    const { outputWidth, outputHeight, columns, rows } = size
    if ([outputWidth, outputHeight, columns, rows].some(v => v <= 0)) return

    const playlists = await Promise.all(playlistBases.map(fetchPlaylistMaster))
    const thumbnails = playlists
        .flatMap(p => p?.songs ?? [])
        .map(v => parseThumbnailUrl(v.type, v.thumbnailUrl))

    if (thumbnails.length === 0) return

    const { canvas, context } = createCanvas(outputWidth, outputHeight, option.background)

    for (const [[i, j], imagePromise] of zip(expansion(range(rows), range(columns)), thumbnails)) {
        const image = await imagePromise
        if (image === undefined) continue

        const x = Math.round(j * outputWidth / columns)
        const y = Math.round(i * outputHeight / rows)
        const tnWidth = Math.round((j + 1) * outputWidth / columns) - x
        const tnHeight = Math.round((i + 1) * outputHeight / rows) - y

        try {
            const trimWidth = Math.min(image.height * RATIO_W / RATIO_H | 0, image.width)
            const trimHeight = Math.min(image.width * RATIO_H / RATIO_W | 0, image.height)

            const flameWidth = Math.min(trimHeight * tnWidth / tnHeight | 0, trimWidth)
            const flameHeight = Math.min(trimWidth * tnHeight / tnWidth | 0, trimHeight)
            const flameX = (image.width - flameWidth) / 2 | 0
            const flameY = (image.height - flameHeight) / 2 | 0

            context.drawImage(image, flameX, flameY, flameWidth, flameHeight, x, y, tnWidth, tnHeight)
        } catch (e) {
            console.error(e)
        }
    }

    const outputUrl = await canvas2URL(canvas, `image/${option.fileType}`)
    return outputUrl
}
