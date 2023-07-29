import { Playlist, PlaylistTypes, Song } from "@/types/playlist"
import axios from "axios"

const cache = new Map<string, Promise<Playlist | undefined>>()

export default async function fetchPlaylistMaster(type: PlaylistTypes, id: string) {
    const key = `${type}-${id}`

    if (cache.has(key)) {
        return cache.get(key)!
    } else {
        const playlistPromise = fetchPlaylist(type, id)
        cache.set(key, playlistPromise)
        return playlistPromise
    }
}

const fetchPlaylist = async (type: PlaylistTypes, id: string): Promise<Playlist | undefined> => {
    let nextPage: string | undefined
    const songs: Song[] = []

    try {
        while (true) {
            const { data } = await axios.get<Playlist>("/api/playlist", {
                params: { type, id, nextPage }
            })

            songs.push(...data.songs)
            nextPage = data.pageToken

            if (!nextPage || songs.length >= 1e3) return { ...data, songs }
        }
    } catch (e) {
        return undefined
    }
}
