import * as z from "zod"
import { PLAYLIST_TYPES } from "./playlist"

export const ALIGN_QUERY = z.object({
    type: z.literal(PLAYLIST_TYPES[0]),
    id: z.string(),
    width: z.preprocess(Number, z.number()).default(160),
    height: z.preprocess(Number, z.number()).default(90),
    columns: z.preprocess(Number, z.number()).default(10),
    rows: z.preprocess(Number, z.number()).default(10),
})
