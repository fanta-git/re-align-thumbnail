import { ConstPlaylistUrlTypes, SongType } from "@/types/playlist"

export const PLAYLIST_TYPES = ['kiite', 'nicovideo', 'youtube', 'vocadb'] as const
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
    },
    {
        type: "youtube",
        regexp: /https:\/\/(?:www\.)?youtube\.com\/playlist\?list=([-\w]+)/
    },
    {
        type: "vocadb",
        regexp: /https:\/\/vocadb\.net\/L\/(\d+)/
    }
] satisfies ConstPlaylistUrlTypes[]

export const VOCADB_SERVICE_RELATIONS = [
    { service: "Youtube", type: "youtube" },
    { service: "NicoNicoDouga", type: "nicovideo" }
] satisfies { service: string, type: SongType }[]
