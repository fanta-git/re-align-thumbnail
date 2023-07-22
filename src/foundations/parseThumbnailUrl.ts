import { SONG_TYPES } from "@/consts/playlist";
import { SongType } from "@/types/playlist";
import { getImage } from "@/util/image";

export async function parseThumbnailUrl(type: SongType, url: string): Promise<HTMLImageElement | undefined> {
    switch (type) {
        case SONG_TYPES.NICO_VIDEO: {
            const [, id, key] = url.match(/https?:\/\/nicovideo\.cdn\.nimg\.jp\/thumbnails\/\d+\/(\d+)(?:\.(\d+))?/)
                ?? url.match(/http:\/\/tn-skr1\.smilevideo\.jp\/smile\?i=(\d+)/)
                ?? []
            if (id === undefined) return

            const thumbnailUrl = key === undefined
                ? `/@thumbnail/nicovideo/${id}/${id}/S`
                : `/@thumbnail/nicovideo/${id}/${id}.${key}/M`

            return getImage(thumbnailUrl)
        }
        case SONG_TYPES.YOUTUBE: {
            const [, id] = url.match(/https:\/\/(?:img\.youtube|i\.ytimg)\.com\/vi\/([-\w]+)/) ?? []
            if (id === undefined) return

            const m = await getImage(`/@thumbnail/youtube/${id}/M`)
            return m.width === 120 && m.height === 90
                ? getImage(`/@thumbnail/youtube/${id}/S`)
                : m
        }
        case SONG_TYPES.SOUND_CLOUD: {
            const replaced = url.replace("https://i1.sndcdn.com", "/@thumbnail/soundcloud")
            return getImage(replaced)
        }
        case SONG_TYPES.BANDCAMP: {
            const replaced = url.replace("https://f4.bcbits.com/img", "/@thumbnail/bandcamp")
            return getImage(replaced)
        }
        case SONG_TYPES.VIMEO: {
            const replaced = url.replace("http://i.vimeocdn.com/video", "/@thumbnail/vimeo")
            return getImage(replaced)
        }
    }
}
