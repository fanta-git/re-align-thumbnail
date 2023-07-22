import { Playlist, PlaylistBase } from "@/types/playlist"
import axios from "axios"

const cache = new Map<string, Promise<Playlist | undefined>>()

export default function fetchPlaylistMaster(playlistBase: PlaylistBase) {
    const { type, id } = playlistBase
    const url = `/api/playlist?type=${type}&id=${id}`

    if (cache.has(url)) {
        return cache.get(url)!
    } else {
        const playlistPromise = axios.get<Playlist>(url).then(v => v.data)
        cache.set(url, playlistPromise)
        return playlistPromise
    }
}
