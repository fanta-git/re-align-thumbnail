import { Checker, Song, SongType } from "@/types/playlist"
import { zipAll } from "@/util/arrays"
import matchByChekers from "./matchByChekers"

export default function insertRelatedSongs (songs: Song[], description: string): Song[] {
    const ordersMap = new Map<Song, number>(songs.map((song, i) => [song, i + 1]))

    const relateds = matchByChekers(description, SONG_TYPE_CHECKERS)
        .map(({ match: [, id] }): Song => ({
            thumbnailUrls: [
                `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
                `https://img.youtube.com/vi/${id}/default.jpg`
            ]
        }))
    const ordersStr = Array.from(description.matchAll(/^>>(.*)/mg), ([, str]) => str).at(-1)
    const orders = ordersStr ? ordersStr.trim().split(/\s+/).map(Number) : []

    for (const [song, order] of zipAll(relateds, orders)) {
        if (song) ordersMap.set(song, order ?? Infinity)
    }

    return [...songs, ...relateds].sort((a, b) => ordersMap.get(a)! - ordersMap.get(b)!)
}

export const SONG_TYPE_CHECKERS = [
    {
        type: "youtube",
        regexp: /https:\/\/www\.youtube\.com\/watch\?v=([-\w]+)/g
    },
    {
        type: "youtube",
        regexp: /https:\/\/youtu\.be\/([-\w]+)/g
    }
] satisfies Checker<SongType>[]
