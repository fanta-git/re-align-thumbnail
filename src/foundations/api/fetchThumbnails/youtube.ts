import { ThumbnailBase } from "@/types/playlist";

export function youtube(ids: string[]): ThumbnailBase[] {
    return ids.map(v => ({ type: 'youtube', url: `https://img.youtube.com/vi/${v}/default.jpg` }))
}
