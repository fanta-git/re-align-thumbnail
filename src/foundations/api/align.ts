import { Song, ThumbnailBase } from '@/types/playlist'
import { expansion, range, zip } from '@/util/arrays'
import sharp from 'sharp'
import { getBuffer } from './getBuffer'

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

    const buffers = await Promise.all(zip(Song, corrected).map(([v, [height, width]]) => getBuffer(v, { width, height })))

    const compositer =
        zip(buffers, coord)
            .filter(([buffers]) => buffers)
            .map(([input, [top, left]]) => ({ input, top, left }))

    return sharp({
        create: {
            width,
            height,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
        }
    }).composite(compositer)
}
