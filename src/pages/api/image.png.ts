import { NextApiRequest, NextApiResponse } from "next";

export default async function image(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch("<url>")
    const blob = await response.blob()
    const contentType = response.headers.get("Content-Type")!
    res.status(200)
        .setHeader("content-Type", contentType)
        .send(blob.stream())
}
