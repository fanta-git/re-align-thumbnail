import { FailedPlaylistContents, PlaylistContents } from "@/types/cafeapi"
import fetchThumbnails from "@/foundations/api/fetchThumbnails"
import { Playlist, Song } from "@/types/playlist"
import { zip, zipFull } from "@/util/generators"
import axios from "axios"

export async function kiite (listId: string): Promise<any | undefined> {
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
        type: 'nicovideo',
        id: v.video_id,
        order: v.order_num
    } as const))
    const youtSongs = extractYoutSong(data.description)
    const songsAll = [...nicoSongs, ...youtSongs].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
    const thumbnails = await fetchThumbnails(songsAll)

    return {
        name: data.list_title,
        description: data.description,
        songs: [...zip(songsAll, thumbnails)].map(([{ id, order }, thumbnailUrl]) => ({
            id, order, thumbnailUrl
        }))
    }
}

function extractYoutSong (description: string) {
    const ids = description.match(/(?<=https:\/\/www\.youtube\.com\/watch\?v=)\w+/g) ?? []
    const orders = description.match(/(?<=^>>).*$/mg)?.at(-1)?.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []

    return [...zipFull(ids, orders)]
        .filter(([id, order]) => id !== undefined)
        .map(([id, order]) => ({
            type: 'youtube',
            id: id!,
            order
        }) as const)
}
