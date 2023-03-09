import { SONG_TYPES, PLAYLIST_TYPES } from "@/consts/playlist"
import { Values, ValuesObj } from "./util"

export type PlaylistTypes = Values<typeof PLAYLIST_TYPES>

export type PlaylistBase = {
    type: PlaylistTypes,
    id: string
}

export type ConstPlaylistUrlTypes = {
    type: PlaylistTypes,
    regexp: RegExp
}[]

export type SongType = ValuesObj<typeof SONG_TYPES>

export type Song = {
    type: SongType,
    id: string
}

export type SongWithThumbnail = Song & {
    thumbnailUrl: string
}
