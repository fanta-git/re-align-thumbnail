import { FormContents } from "@/types/form";
import { getListBase } from "./getListBase";

export function getImageUrl (data: FormContents | undefined) {
    if (data === undefined) return
    const { url, width, height, columns, rows } = data
    const playlist = getListBase(url)
    if (playlist === undefined) return
    const { type, id } = playlist

    const imageUrl = "/api/playlist/image"
    const params = { type, id, width, height, columns, rows }
    const query = Object.entries(params).map(([key, val]) => `${key}=${val}`).join("&")

    return query ? `${imageUrl}?${query}` : imageUrl
}
