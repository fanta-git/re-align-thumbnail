import { FailedPlaylistContents, PlaylistContents } from "@/types/cafeapi"
import axios from "axios"

export async function kiite (listId: string) {
    const params = {
        list_id: listId
    }

    const response = await axios.get<PlaylistContents | FailedPlaylistContents>(
        '/@cafeapi/playlists/contents/detail',
        { params }
    )

    return response
}
