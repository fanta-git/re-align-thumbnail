import { Checker, SongType } from "@/types/playlist";
import { getImage } from "@/util/image";

export async function parseThumbnailUrl(urls: string[]): Promise<HTMLImageElement | undefined> {
    for (const url of urls) {
        try {
            for (const { type, regexp } of THUMBNAIL_TYPE_CHECKERS) {
                const [, name] = url.match(regexp) ?? []
                if (name === undefined) continue

                return await getImage(`/@thumbnail/${type}/${name}`)
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export const THUMBNAIL_TYPE_CHECKERS = [
    {
        type: "nicovideo",
        regexp: /https?:\/\/nicovideo\.cdn\.nimg\.jp\/thumbnails\/(\d+\/[\w.]+)/
    },
    {
        type: "youtube",
        regexp: /https?:\/\/img\.youtube\.com\/vi\/([-\w]+\/[.\w]+)/
    },
    {
        type: "youtube",
        regexp: /https?:\/\/i\.ytimg\.com\/vi\/([-\w]+\/[.\w]+)/
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
