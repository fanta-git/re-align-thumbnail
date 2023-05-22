import { ALIGN_QUERY } from "@/consts/schema";
import { align } from "@/foundations/api/align";
import fetchPlaylist from "@/foundations/api/fetchPlaylist";
import { NextApiRequest, NextApiResponse } from "next";

export default async function image(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = ALIGN_QUERY.parse(req.query)

        const { type, id } = query
        const songs = await fetchPlaylist(type, id)
        if (songs === undefined) return res.status(400).json({ error: 'faild fetch playlist' })
        const alignedSharp = await align(songs, query)
        const buffer = await alignedSharp.jpeg().toBuffer()
        return res.setHeader("content-Type", 'image/jpeg')
            .send(buffer)
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ error: e.message })
        }
    }
}
