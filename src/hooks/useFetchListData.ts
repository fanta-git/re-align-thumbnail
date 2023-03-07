import { FailedPlaylistContents, PlaylistContents } from "@/types/cafeapi"
import { r } from "@/util/regExpFromTemplate"
import { playlistState } from "@/stores/playlist"
import axios from "axios"
import { useSetRecoilState } from "recoil"

export function useFetchListData () {
    const setPlaylist = useSetRecoilState(playlistState)

    const fetchListData = async (url: string) => {
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
        setPlaylist(response.data)
    }

    return fetchListData
}
