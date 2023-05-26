import { Song } from '@/types/playlist'
import { expansion, range } from '@/util/arrays'
import { createCanvas } from '@/util/canvas'
import { getImage } from '@/util/image'

type Options = {
    width: number,
    height: number,
    columns: number,
    rows: number
}

export async function align(songs: (Song | undefined)[], options: Options) {
    const { width, height, columns, rows } = options
    const imagesPromises = songs.map(v => v && getImage(v.thumbnailUrl))

    const { canvas, context } = createCanvas(width, height)

    for (const [i, j] of expansion(range(rows), range(columns))) {
        try {
            const image = await imagesPromises[i * columns + j]
            if (image === undefined) continue
            const { width: imageWidth, height: imageHeight } = image
            const x = Math.round(j * width / columns)
            const y = Math.round(i * height / rows)
            const tnWidth = Math.round((j + 1) * width / columns) - x
            const tnHeight = Math.round((i + 1) * height / rows) - y
            const flameWidth = Math.min(imageHeight * tnWidth / tnHeight | 0, imageWidth)
            const flameHeight = Math.min(imageWidth * tnHeight / tnWidth | 0, imageHeight)
            const flameX = (imageWidth - flameWidth) / 2 | 0
            const flameY = (imageHeight - flameHeight) / 2 | 0
            context.drawImage(image, flameX, flameY, flameWidth, flameHeight, x, y, tnWidth, tnHeight)
        } catch (e) {
            console.error(e)
        }
    }

    return canvas.toDataURL('image/jpeg')
}
