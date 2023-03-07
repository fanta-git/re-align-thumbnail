import { FailedPlaylistContents, PlaylistContents } from "@/types/cafeapi"
import { r } from "@/util/regExpFromTemplate"
import axios from "axios"

export async function fetchListData (url: string) {
    const [, listId] = url.match(r`https://kiite.jp/playlist/(\w{10})`) ?? []
    if (listId === undefined) return

    const params = {
        list_id: listId
    }

    const response = await axios.get<PlaylistContents | FailedPlaylistContents>(
        '/@cafeapi/playlists/contents/detail',
        { params }
    )

    if (response.data.status === "failed") throw Error(response.data.error.message)
    return response.data
}
