import { ConstPlaylistUrlTypes, PlaylistApiRes } from "@/types/playlist";
import axios from "axios";
import { parseThumbnailUrl } from "../parseThumbnailUrl";

const nicovideo = {
    type: "nicovideo",
    regexp: /https:\/\/(?:www\.nicovideo\.jp\/(?:my\/|user\/\d+\/)?|sp\.nicovideo\.jp\/(?:my\/)?)mylist\/(\d+)/,
    fetch: async (listId) => {
        const result = await axios.get<PlaylistApiRes>(`/api/mylist?id=${listId}`)

        return {
            ...result.data,
            songs: result.data.songs.map(({ type, url, thumbnailUrl }) => ({
                type,
                url,
                thumbnail: parseThumbnailUrl(type, thumbnailUrl)
            }))
        }
    }
} satisfies ConstPlaylistUrlTypes

export { nicovideo };

