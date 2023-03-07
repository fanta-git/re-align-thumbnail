import { playlistUrlTypes } from "@/consts/playlistUrlTypes"
import { PlaylistBase } from "@/types/playlist"

export function getListBase (url: string): PlaylistBase | undefined {
    for (const { type, regexp } of playlistUrlTypes) {
        const result = url.match(regexp)
        if (result) return ({ type, id: result[1] })
    }
}
