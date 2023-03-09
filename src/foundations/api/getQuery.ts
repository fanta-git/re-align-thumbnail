import { PLAYLIST_TYPES } from "@/consts/playlist"
import { has } from "@/util/arrays"
import { NextApiRequest } from "next"

export function getPlaylistQuery (req: NextApiRequest) {
    const { type, id } = req.query

    if (has(PLAYLIST_TYPES, type) && typeof id === 'string') return { type, id }
}
