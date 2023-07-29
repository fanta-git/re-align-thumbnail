import { PLAYLIST_TYPES, SONG_TYPES } from "@/consts/playlist"
import { Values } from "./util"

export type PlaylistTypes = Values<typeof PLAYLIST_TYPES>

export type PlaylistBase = {
    type: PlaylistTypes,
    id: string,
    fetching: Promise<Playlist | undefined>
}

export type Checker<T> = {
    type: T,
    regexp: RegExp
}

export type FetchPlaylist = (listId: string, nextPage?: string) => Promise<Playlist>

export type SongType = Values<typeof SONG_TYPES>

export type Playlist = {
    type: PlaylistTypes,
    id: string,
    title: string,
    description?: string,
    pageToken?: string,
    songs: Song[]
}

export type Song = {
    type: SongType,
    url: string,
    thumbnailUrl: string
}
