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

    const related = new Map<string, string>(res.data.data.map((v: any) => [v.contentId, v.thumbnailUrl]))

    return ids.map(v => related.get(v))
}
