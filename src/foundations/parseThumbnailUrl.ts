import { Checker, SongType } from "@/types/playlist";
import { getImage } from "@/util/image";

export async function parseThumbnailUrl(type: SongType, url: string): Promise<HTMLImageElement | undefined> {
    for (const checker of THUMBNAIL_TYPE_CHECKERS) {
        if (type !== checker.type) continue

        const [, id, key] = url.match(checker.regexp) ?? []
        if (id === undefined) continue

        switch (type) {
            case "nicovideo": {
                const thumbnailUrl = key === undefined
                    ? `/@thumbnail/nicovideo/${id}/${id}/S`
                    : `/@thumbnail/nicovideo/${id}/${id}.${key}/M`

                return getImage(thumbnailUrl)
            }
            case "youtube": {
                const m = await getImage(`/@thumbnail/youtube/${id}/M`)
                return m.width === 120 && m.height === 90
                    ? getImage(`/@thumbnail/youtube/${id}/S`)
                    : m
            }
            default: {
                return getImage(`/@thumbnail/${type}/${id}`)
            }
        }
    }
}

export const THUMBNAIL_TYPE_CHECKERS = [
    {
        type: "nicovideo",
        regexp: /https?:\/\/nicovideo\.cdn\.nimg\.jp\/thumbnails\/\d+\/(\d+)(?:\.(\d+))?/
    },
    {
        type: "nicovideo",
        regexp: /https?:\/\/tn-skr1\.smilevideo\.jp\/smile\?i=(\d+)/
    },
    {
        type: "youtube",
        regexp: /https?:\/\/img\.youtube\.com\/vi\/([-\w]+)/
    },
    {
        type: "youtube",
        regexp: /https?:\/\/i1?\.ytimg\.com\/vi\/([-\w]+)/
    },
    {
        type: "soundcloud",
        regexp: /https?:\/\/i1\.sndcdn\.com\/([-.\w]+)/
    },
    {
        type: "bandcamp",
        regexp: /https?:\/\/f4\.bcbits\.com\/img\/([-.\w]+)/
    },
    {
        type: "vimeo",
        regexp: /https?:\/\/i\.vimeocdn\.com\/video\/([-.\w]+)/
    },
] satisfies Checker<SongType>[]
