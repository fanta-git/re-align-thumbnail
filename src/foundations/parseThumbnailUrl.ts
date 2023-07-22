import { SONG_TYPES, THUMBNAIL_TYPE_CHECKERS } from "@/consts/playlist";
import { SongType } from "@/types/playlist";
import { getImage } from "@/util/image";

export async function parseThumbnailUrl(type: SongType, url: string): Promise<HTMLImageElement | undefined> {
    for (const checker of THUMBNAIL_TYPE_CHECKERS) {
        if (type !== checker.type) continue

        const [, id, key] = url.match(checker.regexp) ?? []
        if (id === undefined) continue

        switch (type) {
            case SONG_TYPES.NICO_VIDEO: {
                const thumbnailUrl = key === undefined
                    ? `/@thumbnail/nicovideo/${id}/${id}/S`
                    : `/@thumbnail/nicovideo/${id}/${id}.${key}/M`

                return getImage(thumbnailUrl)
            }
            case SONG_TYPES.YOUTUBE: {
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
