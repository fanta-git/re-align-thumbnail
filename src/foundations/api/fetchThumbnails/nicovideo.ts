import { ThumbnailBase } from "@/types/playlist"
import axios from "axios"

export async function nicovideo(ids: string[]) {
    const filters = Object.fromEntries(
        ids.map((v, i) => [`filters[contentId][${i}]`, v])
    )

    const res = await axios.get<any>('https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search', {
        params: {
            q: '',
            fields: 'contentId,thumbnailUrl',
            ...filters,
            _sort: '+startTime',
            _limit: ids.length,
            _context: 'Re:AlignThumbnail'
        }
    })

    const related = new Map<string, ThumbnailBase>(res.data.data.map((v: any) => [v.contentId, { type: 'nicovideo', url: v.thumbnailUrl }]))

    return ids.map(v => related.get(v))
}
