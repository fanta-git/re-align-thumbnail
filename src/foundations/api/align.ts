import { ThumbnailBase } from '@/types/playlist'
import { expansion, range, zip } from '@/util/arrays'
import sharp from 'sharp'
import { getBuffer } from './getBuffer'

type Options = {
    width: number,
    height: number,
    columns: number,
    rows: number
}

export async function align(thumbnailBases: (ThumbnailBase | undefined)[], options: Options) {
    const { width, height, columns, rows } = options

    const outputWidth = width * columns | 0
    const outputHeight = height * rows | 0

    const coordColumns = range(columns).map(v => v * width | 0)
    const coordRows = range(rows).map(v => v * height | 0)
    const coord = expansion(coordRows, coordColumns)

    const correctedWidths = coordColumns.map((v, i, a) => (a[i + 1] ?? outputWidth) - v)
    const correctedHeights = coordRows.map((v, i, a) => (a[i + 1] ?? outputHeight) - v)
    const corrected = expansion(correctedHeights, correctedWidths)

    const buffers = await Promise.all(zip(thumbnailBases, corrected).map(([v, [height, width]]) => getBuffer(v, { width, height })))

    const compositer =
        zip(buffers, coord)
            .filter(([buffers]) => buffers)
            .map(([input, [top, left]]) => ({ input, top, left }))

    return sharp({
        create: {
            width: outputWidth,
            height: outputHeight,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
        }
    }).composite(compositer)
}
