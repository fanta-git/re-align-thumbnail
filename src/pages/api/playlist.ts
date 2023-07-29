import { mylistQuerySchema } from '@/consts/schema'
import * as playlistFetchers from "@/foundations/fetchPlaylist"
import insertRelatedSongs from '@/foundations/insertRelatedSongs'
import { Playlist } from '@/types/playlist'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Playlist | { error: any }>) {
    const { type, id, nextPage } = mylistQuerySchema.parse(req.query)
    try {
        const result = await playlistFetchers[type](id, nextPage)
        if (result.description && type !== "youtube") {
            result.songs = insertRelatedSongs(result.songs, result.description)
        }

        return res.status(200).json(result)
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const axiosError = e.toJSON() as any
            const error = {
                code: axiosError.code,
                message: axiosError.message,
                name: axiosError.name,
                status: axiosError.status
            }
            return res.status(e?.status ?? 500).json({ error })
        }

        console.error(e);
        return res.status(500).json({ error: {
            message: "不明なエラー"
        }})
    }
}
