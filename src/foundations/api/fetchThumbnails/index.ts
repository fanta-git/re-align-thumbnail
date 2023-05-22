export * from './nicovideo'
export * from './youtube'
import { SongType } from '@/types/playlist'
import { groupBy, zip } from '@/util/arrays'
import * as fetchThumbnailItems from '.'

type Song = {
    type: SongType,
    id: string
}

export default async function fetchThumbnails(songs: Song[]) {
    const grouped = groupBy(songs, song => song.type)
    const thumbnailUrls = await Promise.all(
        grouped.map(([type, songs]) => fetchThumbnailItems[type](songs.map(v => v.id)))
    )
    const related = new Map(zip(grouped.flatMap(v => v[1]), thumbnailUrls.flat()))

    return songs.map(v => related.get(v))
}
