import { FormContents } from "@/types/form";
import { align } from "./align";
import fetchPlaylist from "./fetchPlaylist";
import { getListBase } from "./getListBase";

export async function getImageUrl (data: FormContents | undefined) {
    if (data === undefined) return
    const { url, outputWidth: width, outputHeight: height, columns, rows } = data
    const playlist = getListBase(url)
    if (playlist === undefined) return
    const { type, id } = playlist

    const songs = await fetchPlaylist(type, id)
    if (songs === undefined) return
    const resultUrl = await align(songs, { width, height, columns, rows })
    return resultUrl
}
