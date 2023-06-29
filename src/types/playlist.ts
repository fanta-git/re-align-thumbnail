import { SONG_TYPES, PLAYLIST_TYPES } from "@/consts/playlist"
import { Values, ValuesObj } from "./util"

export type PlaylistTypes = Values<typeof PLAYLIST_TYPES>

export type PlaylistBase = {
    type: PlaylistTypes,
    id: string
}

export type ConstPlaylistUrlTypes = {
    type: PlaylistTypes,
    regexp: RegExp,
    fetch: (listId: string) => Promise<Playlist>
}

export type SongType = ValuesObj<typeof SONG_TYPES>

export type Playlist = {
    type: PlaylistTypes,
    id: string,
    title: string,
    description?: string,
    songs: Song[]
}

export type Song = {
    type: SongType,
    id: string,
    thumbnailUrl: string
}

export type ThumbnailBase = {
    type: SongType,
    url: string
}
