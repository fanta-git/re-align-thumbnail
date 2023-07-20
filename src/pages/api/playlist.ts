import { mylistQuerySchema } from '@/consts/schema'
import * as playlistFetchers from "@/foundations/fetchPlaylist"
import { Playlist } from '@/types/playlist'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Playlist>) {
    const { type, id } = mylistQuerySchema.parse(req.query)
    const result = await playlistFetchers[type](id)

    return res.status(200).json(result)
}
