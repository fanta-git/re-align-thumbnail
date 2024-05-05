import { kiitePlaylistApiMinSchema } from "@/consts/schema"
import { FetchPlaylist } from "@/types/playlist"
import axios, { AxiosError } from "axios"
import formatThumbnailUrl from "../formatThumbnailUrl"

const kiite: FetchPlaylist = async (listId) => {
    const response = await axios.get<unknown>(`https://kiite.jp/api/playlist/${listId}`)
    const parse = kiitePlaylistApiMinSchema.safeParse(response.data)
    if (!parse.success) throw Object.assign(
        new AxiosError("Request failed with status code 404", "ERR_BAD_REQUEST"),
        { status: 404 }
    )
    const { data } = parse

    return {
        type: 'kiite',
        id: data.list_id.toString(),
        title: data.list_title,
        description: data.description,
        songs: data.songs.map(v => ({
            thumbnailUrls: formatThumbnailUrl(v.thumbnail),
            fallbackThumbInfoId: v.video_id
        }))
    }
}

export { kiite }
