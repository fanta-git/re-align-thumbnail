import { SONG_TYPES } from "@/consts/playlist";
import { SongType } from "@/types/playlist";
import { getImage } from "@/util/image";

export async function parseThumbnailUrl(type: SongType, url: string): Promise<HTMLImageElement | undefined> {
    switch (type) {
        case SONG_TYPES.NICO_VIDEO: {
            const matched = url.match(/https?:\/\/nicovideo\.cdn\.nimg\.jp\/thumbnails\/\d+\/(\d+)(?:\.(\d+))?/)
            if (matched === null) return
            const [, id, key] = matched
            return getImage(key === undefined
                ? `/@thumbnail/nicovideo/${id}/${id}/S`
                : `/@thumbnail/nicovideo/${id}/${id}.${key}/M`
            )
        }
        case SONG_TYPES.YOUTUBE: {
            const matched = url.match(/https:\/\/www\.youtube\.com\/watch\?v=(\w+)/)
            if (matched === null) return
            const [, id] = matched

            const m = await getImage(`/@thumbnail/youtube/${id}/M`)
            return m.width === 120 && m.height === 120
                ? getImage(`/@thumbnail/youtube/${id}/S`)
                : m
        }
    }
}
