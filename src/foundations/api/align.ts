import { ThumbnailBase } from '@/types/playlist'
import { expansion, range, zip } from '@/util/arrays'
import axios from 'axios'
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

    const buffers = await Promise.all(thumbnailBases.map(v => getBuffer(v, { width, height })))
    const coord = expansion(range(rows), range(columns))
    const compositer =
        zip(coord, buffers)
            .filter(([_, buffers]) => buffers)
            .map(([[y, x], buffer]) => ({
                input: buffer!,
                top: y * height,
                left: x * width
            }))

    return sharp({
        create: {
            width: width * columns,
            height: height * rows,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
        }
    }).composite(compositer)
}
