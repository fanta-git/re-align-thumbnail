import { expansion, range, zip } from '@/util/arrays'
import axios from 'axios'
import sharp from 'sharp'

export async function align(urls: string[]) {
    const buffersPromise = urls.map(url =>
        axios.get<Buffer>(url, { responseType: "arraybuffer" })
            .then(v => sharp(v.data)
                .resize({
                    height: 90,
                    width: 160
                })
                .toBuffer()
            )
    )
    const buffers = await Promise.all(buffersPromise)

    const coord = expansion(range(10), range(10))
    const compositer =
        zip(coord, buffers)
            .map(([[y, x], buffer]) => ({
                input: buffer,
                top: y * 90,
                left: x * 160
            }))

    return sharp({
        create: {
            width: 1600,
            height: 900,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
        }
    }).composite(compositer)
}
