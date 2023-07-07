import { Playlist, PlaylistBase } from "@/types/playlist"
import { Split } from "@/types/util"
import * as playlistFetchers from "./fetchPlaylist"

const cache = new Map<string, Promise<Playlist | undefined>>()

export default function fetchPlaylistMaster(playlistBase: PlaylistBase) {
    const [type, listId] = playlistBase.split("-") as Split<typeof playlistBase, "-">
    const { fetch } = playlistFetchers[type]

    if (cache.has(listId)) {
        return cache.get(listId)!
    } else {
        const playlistPromise = fetch(listId)
        cache.set(listId, playlistPromise)
        return playlistPromise
    }
}
