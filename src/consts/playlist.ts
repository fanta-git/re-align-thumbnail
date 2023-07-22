import { ConstPlaylistUrlTypes, SongType, SongTypeChecker } from "@/types/playlist"

export const PLAYLIST_TYPES = ['kiite', 'nicovideo', 'youtube', 'vocadb'] as const
export const SONG_TYPES = {
    NICO_VIDEO: 'nicovideo',
    YOUTUBE: 'youtube',
    SOUND_CLOUD: 'soundcloud',
    BANDCAMP: "bandcamp",
    VIMEO: 'vimeo'
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

export const SONG_TYPE_CHECKERS = [
    {
        type: SONG_TYPES.YOUTUBE,
        regexp: /https:\/\/www\.youtube\.com\/watch\?v=([-\w]+)/g
    },
    {
        type: SONG_TYPES.YOUTUBE,
        regexp: /https:\/\/youtu\.be\/([-\w]+)/g
    }
] satisfies SongTypeChecker[]

export const THUMBNAIL_TYPE_CHECKERS = [
    {
        type: SONG_TYPES.NICO_VIDEO,
        regexp: /https?:\/\/nicovideo\.cdn\.nimg\.jp\/thumbnails\/\d+\/(\d+)(?:\.(\d+))?/
    },
    {
        type: SONG_TYPES.NICO_VIDEO,
        regexp: /https?:\/\/tn-skr1\.smilevideo\.jp\/smile\?i=(\d+)/
    },
    {
        type: SONG_TYPES.YOUTUBE,
        regexp: /https?:\/\/img\.youtube\.com\/vi\/([-\w]+)/
    },
    {
        type: SONG_TYPES.YOUTUBE,
        regexp: /https?:\/\/i1?\.ytimg\.com\/vi\/([-\w]+)/
    },
    {
        type: SONG_TYPES.SOUND_CLOUD,
        regexp: /https?:\/\/i1\.sndcdn\.com\/([-.\w]+)/
    },
    {
        type: SONG_TYPES.BANDCAMP,
        regexp: /https?:\/\/f4\.bcbits\.com\/img\/([-.\w]+)/
    },
    {
        type: SONG_TYPES.VIMEO,
        regexp: /https?:\/\/i\.vimeocdn\.com\/video\/([-.\w]+)/
    },
] satisfies SongTypeChecker[]

export const VOCADB_SERVICE_RELATIONS = [
    { service: "Youtube", type: SONG_TYPES.YOUTUBE },
    { service: "NicoNicoDouga", type: SONG_TYPES.NICO_VIDEO },
    { service: "SoundCloud", type: SONG_TYPES.SOUND_CLOUD },
    { service: "Bandcamp", type: SONG_TYPES.BANDCAMP },
    { service: "Vimeo", type: SONG_TYPES.VIMEO }
] satisfies { service: string, type: SongType }[]
