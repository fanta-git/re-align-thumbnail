export type playlistTypes = 'kiite'

export type PlaylistBase = {
    type: playlistTypes,
    id: string
}

export type ConstPlaylistUrlTypes = {
    type: playlistTypes,
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
