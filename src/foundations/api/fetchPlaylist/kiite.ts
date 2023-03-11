import { FailedPlaylistContents, PlaylistContents } from "@/types/cafeapi"
import axios from "axios"
import { Song } from "@/types/playlist"
import { SONG_TYPES } from "@/consts/playlist"
import { zipAll } from "@/util/arrays"

export async function kiite (listId: string): Promise<Song[] | undefined> {
    const params = {
        list_id: listId
    }

    const response = await axios.get<PlaylistContents | FailedPlaylistContents>(
        'https://cafeapi.kiite.jp/api/playlists/contents/detail',
        { params }
    )
    if (response.data.status === 'failed') return
    const { data } = response;

    const nicoSongs = data.songs.map(v => ({
        type: SONG_TYPES.NICO_VIDEO,
        id: v.video_id,
        order: v.order_num
    } as const))
    const youtSongs = extractYoutSong(data.description)
    const songsAll = [...nicoSongs, ...youtSongs].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))

    return songsAll
}

function extractYoutSong (description: string) {
    const ids = description.match(/(?<=https:\/\/www\.youtube\.com\/watch\?v=)\w+/g) ?? []
    const orders = description.match(/(?<=^>>).*$/mg)?.at(-1)?.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []

    return zipAll(ids, orders)
        .filter(([id, order]) => id !== undefined)
        .map(([id, order]) => ({
            type: SONG_TYPES.YOUTUBE,
            id: id!,
            order
        }) as const)
}
