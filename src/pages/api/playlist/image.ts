import { align } from "@/foundations/api/align";
import fetchPlaylist from "@/foundations/api/fetchPlaylist";
import fetchThumbnails from "@/foundations/api/fetchThumbnails";
import { getPlaylistQuery } from "@/foundations/api/getQuery";
import { NextApiRequest, NextApiResponse } from "next";

export default async function image(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = getPlaylistQuery(req)
        if (query === undefined) return res.status(400).json({ error: 'invalid query' })

        const { type, id } = query
        const songs = await fetchPlaylist(type, id)
        if (songs === undefined) return res.status(400).json({ error: 'faild fetch playlist' })
        const thumbnails = await fetchThumbnails(songs) as string[]
        const alignedSharp = await align(thumbnails)
        const buffer = await alignedSharp.jpeg().toBuffer()
        res.status(200)
        res.setHeader("content-Type", 'image/jpeg')
        res.send(buffer)
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ error: e.message })
        }
    } finally {
        res.end()
    }
}
