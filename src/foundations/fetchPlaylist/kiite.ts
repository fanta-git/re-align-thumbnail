import { KiiteApiList } from "@/types/kiiteapi"
import { FetchPlaylist } from "@/types/playlist"
import axios from "axios"

const kiite: FetchPlaylist = async (listId) => {
    const { data } = await axios.get<KiiteApiList>(`https://kiite.jp/api/playlist/${listId}`)

    return {
        type: 'kiite',
        id: data.list_id.toString(),
        title: data.list_title,
        description: data.description,
        songs: data.songs.map(v => ({
            type: "nicovideo",
            url: v.video_url,
            thumbnailUrl: v.thumbnail
        }))
    }
}

export { kiite }
