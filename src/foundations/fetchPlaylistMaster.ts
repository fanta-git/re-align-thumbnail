import { Playlist, PlaylistBase } from "@/types/playlist"
import * as playlistFetchers from "./fetchPlaylist"

const cache = new Map<string, Promise<Playlist | undefined>>()

export default function fetchPlaylistMaster(playlistBase: PlaylistBase) {
    const { type, id } = playlistBase
    const { fetch } = playlistFetchers[type]

    if (cache.has(id)) {
        return cache.get(id)!
    } else {
        const playlistPromise = fetch(id)
        cache.set(id, playlistPromise)
        return playlistPromise
    }
}
