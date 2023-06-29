import { SONG_TYPES } from "@/consts/playlist"
import { KiiteApiList } from "@/types/kiiteapi"
import { Playlist, Song } from "@/types/playlist"
import axios from "axios"
import getRelatedSongs from "../getRelatedSongs"

type SongWithOrder = Song & { order: number }

export async function kiite (url: string): Promise<Playlist | undefined> {
    const result = url.match(/https:\/\/kiite\.jp\/playlist\/(\w{10})/)
    if (result === null) return
    const [, listId] = result
    const response = await axios.get<KiiteApiList>(`/@kiite-api/playlist/${listId}`)
    const { data } = response

    const nicoSongs = data.songs.map((v, i): SongWithOrder => ({
        type: SONG_TYPES.NICO_VIDEO,
        id: v.video_id,
        thumbnailUrl: v.thumbnail.replace('http://nicovideo.cdn.nimg.jp/thumbnails', '/@thumbnail-nv'),
        order: i
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
