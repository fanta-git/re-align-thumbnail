import { SONG_TYPES } from "@/consts/playlist"
import { KiiteApiList } from "@/types/kiiteapi"
import { ConstPlaylistUrlTypes, Playlist, Song } from "@/types/playlist"
import axios from "axios"
import getRelatedSongs from "../getRelatedSongs"

type SongWithOrder = Song & { order: number }

const kiite = {
    type: 'kiite',
    regexp: /https:\/\/kiite\.jp\/playlist\/(\w{10})/,
    fetch: async (listId) => {
        const response = await axios.get<KiiteApiList>(`/@kiite-api/playlist/${listId}`)
        const { data } = response

        const nicoSongs = data.songs.map((v, i): SongWithOrder => ({
            type: SONG_TYPES.NICO_VIDEO,
            id: v.video_id,
            thumbnailUrl: v.thumbnail.replace('http://nicovideo.cdn.nimg.jp/thumbnails', '/@thumbnail-nv'),
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
} satisfies ConstPlaylistUrlTypes

export { kiite }
