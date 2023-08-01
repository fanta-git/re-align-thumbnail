import { FetchPlaylist } from "@/types/playlist";
import { YoutubeApiPlaylistItems } from "@/types/youtubeapi";
import { nonNullable } from "@/util/arrays";
import axios from "axios";


const youtube: FetchPlaylist = async (listId, nextPage) => {
    const key = process.env.YOUTUBE_API_KEY

    const { data } = await axios.get<YoutubeApiPlaylistItems>("https://www.googleapis.com/youtube/v3/playlistItems", {
        params: {
            key,
            playlistId: listId,
            maxResults: 50,
            pageToken: nextPage,
            part: "snippet"
        }
    })

    return {
        type: "youtube",
        title: "YouTube",
        id: listId,
        pageToken: data.nextPageToken,
        songs: data.items.map(v => ({
            type: "youtube",
            url: `https://youtu.be/${v.snippet.resourceId.videoId}`,
            thumbnailUrls: [
                v.snippet.thumbnails.standard?.url,
                v.snippet.thumbnails.default?.url,
            ].filter(nonNullable)
        }))
    }
}

export { youtube };

