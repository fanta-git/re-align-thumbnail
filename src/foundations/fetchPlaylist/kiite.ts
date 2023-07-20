import { SONG_TYPES } from "@/consts/playlist"
import { KiiteApiList } from "@/types/kiiteapi"
import { FetchPlaylist, Song } from "@/types/playlist"
import axios from "axios"
import getRelatedSongs from "../getRelatedSongs"

type SongWithOrder = Song & { order: number }

const kiite: FetchPlaylist = async (listId) => {
    const response = await axios.get<KiiteApiList>(`https://kiite.jp/api/playlist/${listId}`)
    const { data } = response

    const nicoSongs = data.songs.map((v, i): SongWithOrder => ({
        type: SONG_TYPES.NICO_VIDEO,
        url: v.video_url,
        thumbnailUrl: v.thumbnail,
        order: i + 1
    }))
    const relatedSongs = getRelatedSongs(data.description)
    const songs = [...nicoSongs, ...relatedSongs].sort((a, b) => a.order - b.order)

    return {
        type: 'kiite',
        id: data.list_id.toString(),
        title: data.list_title,
        description: data.description,
        songs
    }
}

export { kiite }
