import { SONG_TYPES } from "@/consts/playlist"
import { Song } from "@/types/playlist"
import { zipAll } from "@/util/arrays"

type SongWithOrder = Song & { order: number }

export default function getRelatedSongs (description: string) {
    const ids = Array.from(description.matchAll(/https:\/\/www\.youtube\.com\/watch\?v=(\w+)/g), ([, id]) => id)
    const ordersStr = Array.from(description.matchAll(/^>>(.*)/mg), ([, str]) => str).at(-1)
    const orders = ordersStr ? ordersStr.trim().split(/\s+/).map(Number) : []

    return zipAll(ids, orders)
        .filter(([id, order]) => id !== undefined)
        .map(([id, order]): SongWithOrder => ({
            type: SONG_TYPES.YOUTUBE,
            id: id!,
            thumbnailUrl: `/@thumbnail-yt/${id}`,
            order: order ?? Infinity
        }))
}
