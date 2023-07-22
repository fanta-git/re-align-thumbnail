import { mylistQuerySchema } from '@/consts/schema'
import * as playlistFetchers from "@/foundations/fetchPlaylist"
import insertRelatedSongs from '@/foundations/insertRelatedSongs'
import { Playlist } from '@/types/playlist'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Playlist | { error: any }>) {
    const { type, id } = mylistQuerySchema.parse(req.query)
    try {
        const result = await playlistFetchers[type](id)
        if (result.description) result.songs = insertRelatedSongs(result.songs, result.description)

        return res.status(200).json(result)
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return res.status(e.response?.status ?? 500).json({ error: e.toJSON() })
        }
    }
}