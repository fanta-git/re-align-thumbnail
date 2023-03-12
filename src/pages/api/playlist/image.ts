import { ALIGN_QUERY } from "@/consts/schema";
import { align } from "@/foundations/api/align";
import fetchPlaylist from "@/foundations/api/fetchPlaylist";
import fetchThumbnails from "@/foundations/api/fetchThumbnails";
import { NextApiRequest, NextApiResponse } from "next";

export default async function image(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = ALIGN_QUERY.parse(req.query)

        const { type, id } = query
        const songs = await fetchPlaylist(type, id)
        if (songs === undefined) return res.status(400).json({ error: 'faild fetch playlist' })
        const thumbnails = await fetchThumbnails(songs) as string[]
        const alignedSharp = await align(thumbnails, query)
        const buffer = await alignedSharp.jpeg().toBuffer()
        res.status(200)
        res.setHeader("content-Type", 'image/jpeg')
        res.send(buffer)
        return res.end()
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ error: e.message })
        }
    }
}
