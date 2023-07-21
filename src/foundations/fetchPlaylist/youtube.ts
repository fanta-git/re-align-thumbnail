import { FetchPlaylist } from "@/types/playlist";
import { YoutubeApiPlaylistItems, YoutubeApiPlaylists } from "@/types/youtubeapi";
import axios from "axios";


const youtube: FetchPlaylist = async (listId) => {
    const key = process.env.YOUTUBE_API_KEY
    const { data: playlists } = await axios.get<YoutubeApiPlaylists>("https://www.googleapis.com/youtube/v3/playlists", {
        params: {
            key,
            id: listId,
            part: "snippet"
        }
    })

    const [playlist] = playlists.items

    const { data: playlistItems } = await axios.get<YoutubeApiPlaylistItems>("https://www.googleapis.com/youtube/v3/playlistItems", {
        params: {
            key,
            playlistId: listId,
            part: "snippet"
        }
    })

    return {
        type: "youtube",
        title: playlist.snippet.title,
        description: playlist.snippet.description,
        id: listId,
        songs: playlistItems.items.map(v => ({
            type: "youtube",
            url: `https://youtu.be/${v.snippet.resourceId.videoId}`,
            thumbnailUrl: `https://img.youtube.com/vi/${v.snippet.resourceId.videoId}/default.jpg`
        }))
    }
}

export { youtube };

