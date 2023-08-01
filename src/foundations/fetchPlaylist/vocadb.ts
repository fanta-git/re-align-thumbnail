import { FetchPlaylist, SongType } from "@/types/playlist";
import { VocadbApiSonglistSongs } from "@/types/vocadbapi";
import { nonNullable } from "@/util/arrays";
import axios from "axios";
import formatThumbnailUrl from "../formatThumbnailUrl";

const vocadb: FetchPlaylist = async (listId, nextPage) => {
    const { data } = await axios.get<VocadbApiSonglistSongs>(`https://vocadb.net/api/songLists/${listId}/songs`, {
        params: {
            childVoicebanks: false,
            start: nextPage,
            maxResults: 100,
            getTotalCount: true,
            fields: "PVs"
        }
    })

    const lastOrder = data.items.at(-1)?.order ?? Infinity

    return {
        type: "vocadb",
        id: listId,
        title: "VocaDB",
        description: "",
        pageToken: lastOrder < data.totalCount ? String(lastOrder) : undefined,
        songs: data.items.map(v => ({
            thumbnailUrls: VOCADB_SERVICE_RELATIONS
                .flatMap(({ service }) =>
                    v.song.pvs
                        .filter(v => v.service === service && v.pvType === "Original")
                        .flatMap(v => formatThumbnailUrl(v.thumbUrl))
            )
        })).filter(nonNullable)
    }
}

export const VOCADB_SERVICE_RELATIONS = [
    { service: "Youtube", type: "youtube" },
    { service: "NicoNicoDouga", type: "nicovideo" },
    { service: "SoundCloud", type: "soundcloud" },
    { service: "Bandcamp", type: "bandcamp" },
    { service: "Vimeo", type: "vimeo" }
] satisfies { service: string, type: SongType }[]

export { vocadb };

