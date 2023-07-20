import { z } from "zod";

export const mylistQuerySchema = z.object({
    id: z.string().regex(/\d+/)
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
