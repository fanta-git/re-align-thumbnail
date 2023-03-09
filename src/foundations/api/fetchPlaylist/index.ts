export * from './kiite'
import { PlaylistTypes } from '@/types/playlist'
import * as fetchPlaylistItems from '.'

export default async function fetchPlaylist(type: PlaylistTypes, id: string) {
    const playlist = await fetchPlaylistItems[type](id)
    return playlist
}
