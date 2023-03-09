import fetchPlaylist from "@/foundations/api/fetchPlaylist";
import fetchThumbnails from "@/foundations/api/fetchThumbnails";
import { getPlaylistQuery } from "@/foundations/api/getQuery";
import { NextApiRequest, NextApiResponse } from "next";

export default async function image(req: NextApiRequest, res: NextApiResponse) {
    const query = getPlaylistQuery(req)
    if (query === undefined) return res.status(400).send({ error: 'invalid query' })

    const { type, id } = query
    const songs = await fetchPlaylist(type, id)
    if (songs === undefined) return res.status(400).send({ error: 'faild fetch playlist' })
    const thumbnails = await fetchThumbnails(songs)
    console.log(thumbnails)

    const response = await fetch(thumbnails[0]!)
    const blob = await response.blob()
    const contentType = response.headers.get("Content-Type")!
    res.status(200)
        .setHeader("content-Type", contentType)
        .send(blob.stream())
}
