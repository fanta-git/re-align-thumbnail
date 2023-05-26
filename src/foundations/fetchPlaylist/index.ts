export * from './kiite'
import { playlistUrlTypes } from '@/consts/playlistUrlTypes'
import * as fetchPlaylistItems from '.'

export default async function fetchPlaylist(url: string) {
    for (const { type, regexp } of playlistUrlTypes) {
        const result = url.match(regexp)
        if (result) {
            const id = result[1]
            const playlist = await fetchPlaylistItems[type](id)
            return playlist
        }
    }
}
