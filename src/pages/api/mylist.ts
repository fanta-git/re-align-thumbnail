import { mylistQuerySchema, mylistRssSchema } from '@/consts/schema'
import { PlaylistApiRes } from '@/types/playlist'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import Parser from 'rss-parser'

export default async function handler(req: NextApiRequest, res: NextApiResponse<PlaylistApiRes>) {
    const { id } = mylistQuerySchema.parse(req.query)
    const axiosRes = await axios.get<string>(`https://www.nicovideo.jp/mylist/${id}?rss=2.0`)
    const parser = new Parser({
        customFields: {
            item: ['description', 'media:thumbnail']
        }
    })
    const parsed = await parser.parseString(axiosRes.data)
        .then(mylistRssSchema.parse)
    const [, playlistId] = parsed.link.match(/\/mylist\/(\d+)/) ?? []
    if (playlistId === undefined) throw new Error("Errorあるよ（笑）")

    const result: PlaylistApiRes = {
        type: "nicovideo",
        title: parsed.title.replace(/‐ニコニコ動画$/, ""),
        description: parsed.description,
        id: playlistId,
        songs: parsed.items.map(v => ({
            type: "nicovideo",
            url: v.link.replace(/\?.*/, ""),
            thumbnailUrl: v['media:thumbnail'].$.url
        }))
    }

    res.status(200).json(result)
}
