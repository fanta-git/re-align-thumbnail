import fetchPlaylist from "@/foundations/api/fetchPlaylist";
import { getPlaylistQuery } from "@/foundations/api/getQuery";
import { NextApiRequest, NextApiResponse } from "next";

export default async function image(req: NextApiRequest, res: NextApiResponse) {
    const query = getPlaylistQuery(req)
    if (query === undefined) return res.status(400).send({ error: 'invalid query' })

    const { type, id } = query
    const playlist = await fetchPlaylist(type, id)

    const response = await fetch("https://3.bp.blogspot.com/-8-z56h5a5Es/VufYbLy4sxI/AAAAAAAA43s/bvclIkQpNGo_b36B7fUWeVf0D1c0i_BTQ/s800/music_norinori_man.png")
    const blob = await response.blob()
    const contentType = response.headers.get("Content-Type")!
    res.status(200)
        .setHeader("content-Type", contentType)
        .send(blob.stream())
}
