import { Song } from '@/types/playlist'
import { expansion, range, zip } from '@/util/arrays'
import { getImage } from '@/util/image'

type Options = {
    width: number,
    height: number,
    columns: number,
    rows: number
}

export async function align(Song: (Song | undefined)[], options: Options) {
    const { width, height, columns, rows } = options

    const thumbnailWidth = width / columns
    const thumbnailHeight = height / rows

    const coordColumns = range(columns).map(v => Math.round(v * thumbnailWidth))
    const coordRows = range(rows).map(v => Math.round(v * thumbnailHeight))
    const coord = expansion(coordRows, coordColumns)

    const correctedWidths = coordColumns.map((v, i, a) => (a[i + 1] ?? width) - v)
    const correctedHeights = coordRows.map((v, i, a) => (a[i + 1] ?? height) - v)
    const corrected = expansion(correctedHeights, correctedWidths)

    const images = await Promise.all(zip(Song, corrected).map(([v, [height, width]]) => v && getImage(v.thumbnailUrl)))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (context === null) return

    for (const [image, [top, left]] of zip(images, coord)) {
        if (image === undefined) continue
        context.drawImage(image, left, top, thumbnailWidth, thumbnailHeight)
    }

    return canvas.toDataURL('image/png')
}
