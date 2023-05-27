import fetchPlaylist from "@/foundations/fetchPlaylist";
import { FormContents } from "@/types/form";
import { expansion, range } from "@/util/arrays";
import { canvas2URL, createCanvas } from "@/util/canvas";
import { getImage } from "@/util/image";
import { useState } from "react";

const RATIO_W = 16
const RATIO_H = 9

export default function useAlign () {
    const [aligned, setAligned] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const align = async (data: FormContents) => {
        try {
            setIsLoading(true)
            const { url, outputWidth, outputHeight, columns, rows } = data
            const songs = await fetchPlaylist(url)
            if (songs === undefined) return

            const imagesPromises = songs.map(v => v && getImage(v.thumbnailUrl))

            const { canvas, context } = createCanvas(outputWidth, outputHeight)

            for (const [i, j] of expansion(range(rows), range(columns))) {
                try {
                    const image = await imagesPromises[i * columns + j]
                    if (image === undefined) continue
                    const { width: imageWidth, height: imageHeight } = image
                    const x = Math.round(j * outputWidth / columns)
                    const y = Math.round(i * outputHeight / rows)
                    const tnWidth = Math.round((j + 1) * outputWidth / columns) - x
                    const tnHeight = Math.round((i + 1) * outputHeight / rows) - y

                    const trimWidth = Math.min(imageHeight * RATIO_W / RATIO_H | 0, imageWidth)
                    const trimHeight = Math.min(imageWidth * RATIO_H / RATIO_W | 0, imageHeight)

                    const flameWidth = Math.min(trimHeight * tnWidth / tnHeight | 0, trimWidth)
                    const flameHeight = Math.min(trimWidth * tnHeight / tnWidth | 0, trimHeight)
                    const flameX = (imageWidth - flameWidth) / 2 | 0
                    const flameY = (imageHeight - flameHeight) / 2 | 0

                    context.drawImage(image, flameX, flameY, flameWidth, flameHeight, x, y, tnWidth, tnHeight)
                } catch (e) {
                    console.error(e)
                }
            }

            const outputUrl = await canvas2URL(canvas, 'image/jpeg')
            setAligned(outputUrl)
        } finally {
            setIsLoading(false)
        }
    }

    return { aligned, align, isLoading } as const
}
