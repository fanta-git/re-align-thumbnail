import { ConstPlaylistUrlTypes } from "@/types/playlist"

export const PLAYLIST_TYPES = ['kiite', 'nicovideo'] as const
export const SONG_TYPES = {
    NICO_VIDEO: 'nicovideo',
    YOUTUBE: 'youtube'
} as const

export const PLAYLIST_TYPE_CHECKERS = [
    {
        type: "kiite",
        regexp: /https:\/\/kiite\.jp\/playlist\/(\w{10})/
    },
    {
        type: "nicovideo",
        regexp: /https:\/\/(?:www\.nicovideo\.jp\/(?:my\/|user\/\d+\/)?|sp\.nicovideo\.jp\/(?:my\/)?)mylist\/(\d+)/
    }
] satisfies ConstPlaylistUrlTypes[]
