import { SONG_TYPES } from "@/consts/playlist";
import { SongType, ThumbnailUrls } from "@/types/playlist";

export function parseThumbnailUrl(type: SongType, url: string): ThumbnailUrls {
    switch (type) {
        case SONG_TYPES.NICO_VIDEO: {
            const matched = url.match(/http:\/\/nicovideo\.cdn\.nimg\.jp\/thumbnails\/\d+\/(\d+)(?:\.(\d+))?/)!
            if (matched === undefined) return { S: "" }
            const [, id, key] = matched
            if (key === undefined) return { S: `/@thumbnail/nicovideo/${id}/${id}/S` }
            return {
                S: `/@thumbnail/nicovideo/${id}/${id}.${key}/S`,
                M: `/@thumbnail/nicovideo/${id}/${id}.${key}/M`
            }
        }
        case SONG_TYPES.YOUTUBE: {
            const matched = url.match(/https:\/\/www\.youtube\.com\/watch\?v=(\w+)/)!
            if (matched === undefined) return { S: "" }
            const [, id] = matched

            return {
                S: `/@thumbnail/youtube/${id}/S`,
                M: `/@thumbnail/youtube/${id}/M`
            }
        }
    }
}
