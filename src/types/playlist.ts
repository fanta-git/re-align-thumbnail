export type playlistTypes = 'kiite'

export type PlaylistBase = {
    type: playlistTypes,
    id: string
}

export type ConstPlaylistUrlTypes = {
    type: playlistTypes,
    regexp: RegExp
}[]
