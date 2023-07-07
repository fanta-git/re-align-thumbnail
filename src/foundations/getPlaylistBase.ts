import { PlaylistBase } from "@/types/playlist"
import * as playlistFetchers from "./fetchPlaylist"

export default function getPlaylistBase(url: string): PlaylistBase | undefined {
    for (const { type, regexp } of Object.values(playlistFetchers)) {
        const result = url.match(regexp)
        if (result) {
            const [, listId] = result
            return `${type}-${listId}`
        }
    }
}
