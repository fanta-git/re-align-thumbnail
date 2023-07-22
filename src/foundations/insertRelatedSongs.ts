import { SONG_TYPE_CHECKERS } from "@/consts/playlist"
import { Song } from "@/types/playlist"
import { zipAll } from "@/util/arrays"
import { getThumbnailUrl } from "@/util/image"

export default function insertRelatedSongs (songs: Song[], description: string): Song[] {
    const ordersMap = new Map<Song, number>(songs.map((song, i) => [song, i + 1]))

    const relateds = SONG_TYPE_CHECKERS
        .flatMap(({ type, regexp }) => [...description.matchAll(regexp)].map(match => ({ match, type })))
        .sort((a, b) => (a.match.index ?? Infinity) - (b.match.index ?? Infinity))
        .map(({ match: [url, id], type }): Song => ({
            type,
            url,
            thumbnailUrl: getThumbnailUrl(type, id) ?? ""
        }))
    const ordersStr = Array.from(description.matchAll(/^>>(.*)/mg), ([, str]) => str).at(-1)
    const orders = ordersStr ? ordersStr.trim().split(/\s+/).map(Number) : []

    for (const [song, order] of zipAll(relateds, orders)) {
        if (song) ordersMap.set(song, order ?? Infinity)
    }

    return [...songs, ...relateds].sort((a, b) => ordersMap.get(a)! - ordersMap.get(b)!)
}
