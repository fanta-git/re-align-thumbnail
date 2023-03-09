import { range, zip } from '@/util/generators'
import axios from 'axios'
import sharp from 'sharp'

export async function align(urls: string[]) {
    const buffers = urls.map(url => axios({ url, responseType: "arraybuffer" }).then(v => v.data as Buffer))
    const images = await Promise.all(buffers.map(async (v) =>
        sharp(await v).resize({
            height: 90,
            width: 160,
        })
    ))

    const coord = [...range(10)].flatMap(y => [...range(10)].map(x => [x, y] as const))

    const background = sharp({ create: {
        width: 1600,
        height: 900,
        channels: 3,
        background: { r: 255, g: 255, b: 255 }
    } })

    const compositer = await Promise.all([...zip(coord, images)].map(async ([[x, y], image]) => ({
        input: await image.toBuffer(),
        top: y * 90,
        left: x * 160
    })))

    return background.composite(compositer).toFile('output.png')
}
