import { mylistRssSchema } from "@/consts/schema";
import { FetchPlaylist } from "@/types/playlist";
import axios from "axios";
import Parser from "rss-parser";
import formatThumbnailUrl from "../formatThumbnailUrl";

const nicovideo: FetchPlaylist = async (listId) => {
    const axiosRes = await axios.get<string>(`https://www.nicovideo.jp/mylist/${listId}?rss=2.0`)
    const parser = new Parser({
        customFields: {
            item: ["description", "media:thumbnail"]
        }
    })
    const parsed = await parser
        .parseString(axiosRes.data)
        .then(mylistRssSchema.parse)

    const [, title = ""] = parsed.title.match(/^マイリスト (.*)‐ニコニコ動画$/) ?? []

    return {
        type: "nicovideo",
        title,
        description: parsed.description,
        id: listId,
        songs: parsed.items.map(v => ({
            thumbnailUrls: formatThumbnailUrl(v["media:thumbnail"].$.url)
        }))
    }
}

export { nicovideo };

