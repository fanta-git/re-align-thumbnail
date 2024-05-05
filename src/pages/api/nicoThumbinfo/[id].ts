import { nicoThumbinfoQuerySchema } from "@/consts/schema"
import { Playlist } from "@/types/playlist"
import axios from "axios"
import { XMLParser } from 'fast-xml-parser'
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse<Playlist | { error: any }>) {
  try {
    const { id } = nicoThumbinfoQuerySchema.parse(req.query)
    const response = await axios.get(`http://ext.nicovideo.jp/api/getthumbinfo/${id}`, {
      responseType: 'document',
      transformResponse: (data) => new XMLParser({
        ignoreDeclaration: true
      }).parse(data)
    })

    return res.status(200).json(response.data)
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

    console.error(e)
    return res.status(500).json({ error: {
      message: "不明なエラー"
    }})
  }
}
