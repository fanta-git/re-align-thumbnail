import * as playlistFetchers from "./fetchPlaylist"

export default async function fetchPlaylistMaster(url: string) {
    for (const fetcher of Object.values(playlistFetchers)) {
        const playlist = await fetcher(url)
        if (playlist) return playlist
    }
}
