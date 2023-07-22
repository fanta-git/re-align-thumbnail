import { PLAYLIST_TYPE_CHECKERS } from "@/consts/playlist"
import { PlaylistBase } from "@/types/playlist"

export default function getPlaylistBase(url: string): PlaylistBase | undefined {
    for (const { type, regexp } of PLAYLIST_TYPE_CHECKERS) {
        const result = url.match(regexp)
        if (result) {
            const [, id] = result
            return { type, id }
        }
    }
}
