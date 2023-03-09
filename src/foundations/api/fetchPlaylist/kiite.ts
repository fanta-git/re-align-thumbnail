import { FailedPlaylistContents, PlaylistContents } from "@/types/cafeapi"
import fetchThumbnails from "@/foundations/api/fetchThumbnails"
import { Playlist, Song } from "@/types/playlist"
import { zipFull } from "@/util/generators"
import axios from "axios"

export async function kiite (listId: string): Promise<Playlist | undefined> {
    const params = {
        list_id: listId
    }

    const response = await axios.get<PlaylistContents | FailedPlaylistContents>(
        'https://cafeapi.kiite.jp/api/playlists/contents/detail',
        { params }
    )
    if (response.data.status === 'failed') return
    const { data } = response;

    const thumbnails = await fetchThumbnails(data.songs.map(v => ({ type: 'nicovideo', id: v.video_id })))

    return {
        name: data.list_title,
        description: data.description,
        songs: data.songs.map((song, i) => ({
            type: 'nicovideo',
            id: song.video_id,
            order: song.order_num,
            thumbnailUrl: thumbnails[i]
        }))
    }
}

function insertYoutube (playlist: Playlist) {
    const ids = playlist.description.match(/(?<=https:\/\/www\.youtube\.com\/watch\?v=)\w+/g) ?? []
    const orders = playlist.description.match(/(?<=^>>).*$/mg)?.at(-1)?.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []

    for (const ziped of zipFull(ids, orders)) {
        const lastOrder = playlist.songs.at(-1)?.order ?? 0;
        const [id, order] = [ziped[0], ziped[1] ?? lastOrder + 1]
        if (id === undefined) break
        const index = playlist.songs.findIndex(v => v.order > order);
        const song: Song = {
            type: 'youtube',
            id,
            order
        };
        if (index < 0) {
            playlist.songs.push(song);
        } else {
            playlist.songs.splice(index, 0, song);
        }
    }
}
