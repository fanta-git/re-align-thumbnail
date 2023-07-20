import { PLAYLIST_TYPES, SONG_TYPES } from "@/consts/playlist"
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

export type PlaylistApiRes = {
    type: PlaylistTypes,
    id: string,
    title: string,
    description?: string,
    songs: {
        type: SongType,
        url: string,
        thumbnailUrl: string
    }[]
}

export type Song = {
    type: SongType,
    url: string,
    thumbnail: Promise<HTMLImageElement | undefined>
}
