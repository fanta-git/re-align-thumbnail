import { expansion, range, zip } from '@/util/arrays'
import axios from 'axios'
import sharp from 'sharp'

type Options = {
    width: number,
    height: number,
    columns: number,
    rows: number
}

export async function align(urls: string[], options: Options) {
    const { width, height, columns, rows } = options

    const buffersPromise = urls.map(url =>
        axios.get<Buffer>(url, { responseType: "arraybuffer" })
            .then(v => sharp(v.data)
                .trim('#101010')
                .resize({ height, width })
                .toBuffer()
            )
    )
    const buffers = await Promise.all(buffersPromise)

    const coord = expansion(range(rows), range(columns))
    const compositer =
        zip(coord, buffers)
            .map(([[y, x], buffer]) => ({
                input: buffer,
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
