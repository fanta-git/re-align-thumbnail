import { align } from "@/foundations/api/align";
import fetchPlaylist from "@/foundations/api/fetchPlaylist";
import fetchThumbnails from "@/foundations/api/fetchThumbnails";
import { getPlaylistQuery } from "@/foundations/api/getQuery";
import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs"

export default async function image(req: NextApiRequest, res: NextApiResponse) {
    const query = getPlaylistQuery(req)
    if (query === undefined) return res.status(400).send({ error: 'invalid query' })

    const { type, id } = query
    const songs = await fetchPlaylist(type, id)
    if (songs === undefined) return res.status(400).send({ error: 'faild fetch playlist' })
    const thumbnails = await fetchThumbnails(songs) as string[]
    const alignedSharp = await align(thumbnails)
    const buffer = alignedSharp.jpeg().toBuffer()

    res.status(200)
        .setHeader("content-Type", 'image/jpeg')
        .send(buffer)
}
