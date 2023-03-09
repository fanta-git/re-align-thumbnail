import { TYPES } from "@/consts/playlist"
import { Values } from "./util"

export type PlaylistTypes = Values<typeof TYPES>

export type PlaylistBase = {
    type: PlaylistTypes,
    id: string
}

export type ConstPlaylistUrlTypes = {
    type: PlaylistTypes,
    regexp: RegExp
}[]

export type Playlist = {
    name: string,
    description: string,
    songs: Song[]
}

export type SongType = 'nicovideo' | 'youtube'

export type Song = {
    type: SongType,
    id: string,
    order: number
}

export type SongWithThumbnail = Song & {
    thumbnailUrl: string
}
