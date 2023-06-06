export * from './kiite'
import { playlistUrlTypes } from '@/consts/playlistUrlTypes'
import { Playlist } from '@/types/playlist'
import * as fetchPlaylistItems from '.'

export default async function fetchPlaylist(url: string): Promise<Playlist | undefined> {
    for (const { type, regexp } of playlistUrlTypes) {
        const result = url.match(regexp)
        if (result) {
            const id = result[1]
            const playlist = await fetchPlaylistItems[type](id)
            return playlist
        }
    }
}
