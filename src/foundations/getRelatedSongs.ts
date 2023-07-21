import { SONG_TYPES } from "@/consts/playlist"
import { Song } from "@/types/playlist"
import { zipAll } from "@/util/arrays"
import { getYoutubeThumbnailUrl } from "@/util/image"

type SongWithOrder = Song & { order: number }

export default function getRelatedSongs (description: string) {
    const urls = Array.from(description.matchAll(/https:\/\/www\.youtube\.com\/watch\?v=[-\w]+/g), ([url]) => url)
    const ordersStr = Array.from(description.matchAll(/^>>(.*)/mg), ([, str]) => str).at(-1)
    const orders = ordersStr ? ordersStr.trim().split(/\s+/).map(Number) : []

    return zipAll(urls, orders)
        .filter(([url, order]) => url !== undefined)
        .map(([url, order]): SongWithOrder => ({
            type: SONG_TYPES.YOUTUBE,
            url,
            thumbnailUrl: getYoutubeThumbnailUrl(url) ?? "",
            order: order ?? Infinity
        }))
}
