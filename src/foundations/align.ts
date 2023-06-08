import { RATIO_W, RATIO_H } from "@/consts/align"
import { FormContents } from "@/types/form"
import { Playlist } from "@/types/playlist"
import { expansion, range } from "@/util/arrays"
import { createCanvas, canvas2URL } from "@/util/canvas"
import { getImage } from "@/util/image"
import fetchPlaylist from "./fetchPlaylist"

const cache = new Map<string, Playlist>()

export default async function align (data: FormContents) {
    const { url, outputWidth, outputHeight, columns, rows } = data
    const playlist = cache.get(url) ?? await fetchPlaylist(url)
    if (playlist === undefined) return
    if (!cache.has(url)) cache.set(url, playlist)

    const imagesPromises = playlist.songs.map(v => getImage(v.thumbnailUrl))

    const { canvas, context } = createCanvas(outputWidth, outputHeight)

    for (const [i, j] of expansion(range(rows), range(columns))) {
        const x = Math.round(j * outputWidth / columns)
        const y = Math.round(i * outputHeight / rows)
        const tnWidth = Math.round((j + 1) * outputWidth / columns) - x
        const tnHeight = Math.round((i + 1) * outputHeight / rows) - y

        try {
            const image = await imagesPromises[i * columns + j]

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

    const outputUrl = await canvas2URL(canvas, 'image/jpeg')
    return outputUrl
}
