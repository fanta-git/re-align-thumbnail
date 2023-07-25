import { z } from "zod";
import { PLAYLIST_TYPES } from "./playlist";

export const mylistQuerySchema = z.object({
    type: z.enum(PLAYLIST_TYPES),
    id: z.string()
})

export const mylistRssSchema = z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
    items: z.object({
        link: z.string(),
        "media:thumbnail": z.object({
            $: z.object({
                url: z.string()
            })
        })
    }).array()
})

export const kiitePlaylistApiMinSchema = z.object({
    list_title: z.string(),
    list_id: z.number(),
    description: z.string(),
    songs: z.object({
        thumbnail: z.string(),
        video_url: z.string(),
    }).array()
})
