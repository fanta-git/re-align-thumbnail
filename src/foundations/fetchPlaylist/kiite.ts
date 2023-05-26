import axios from "axios"
import { Song } from "@/types/playlist"
import { SONG_TYPES } from "@/consts/playlist"
import { zipAll } from "@/util/arrays"
import { KiiteApiList } from "@/types/kiiteapi"

type SongWithOrder = Song & { order: number }

export async function kiite (listId: string): Promise<Song[] | undefined> {
    const response = await axios.get<KiiteApiList>(`/@kiite-api/playlist/${listId}`)
    const { data } = response

    const nicoSongs = data.songs.map((v, i): SongWithOrder => ({
        type: SONG_TYPES.NICO_VIDEO,
        id: v.video_id,
        thumbnailUrl: v.thumbnail.replace('http://nicovideo.cdn.nimg.jp/thumbnails', '/@thumbnail-nv'),
        order: i
    }))
    const youtSongs = extractYoutSong(data.description)
    const songsAll = [...nicoSongs, ...youtSongs].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))

    return songsAll
}

function extractYoutSong (description: string) {
    const ids = description.match(/(?<=https:\/\/www\.youtube\.com\/watch\?v=)\w+/g) ?? []
    const orders = description.match(/(?<=^>>).*$/mg)?.at(-1)?.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []

    return zipAll(ids, orders)
        .filter(([id, order]) => id !== undefined)
        .map(([id, order]): SongWithOrder => ({
            type: SONG_TYPES.YOUTUBE,
            id: id!,
            thumbnailUrl: `/@thumbnail-yt/${id}`,
            order
        }))
}
