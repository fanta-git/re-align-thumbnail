import { FetchPlaylist, SongType } from "@/types/playlist";
import { VocadbApiSonglistSongs } from "@/types/vocadbapi";
import { nonNullable } from "@/util/arrays";
import axios from "axios";

const vocadb: FetchPlaylist = async (listId) => {
    const { data } = await axios.get<VocadbApiSonglistSongs>(`https://vocadb.net/api/songLists/${listId}/songs`, {
        params: {
            childVoicebanks: false,
            start: 0,
            maxResults: 100,
            getTotalCount: false,
            fields: "PVs"
        }
    })

    return {
        type: "vocadb",
        id: listId,
        title: "VocaDB",
        description: "",
        songs: data.items.map(v => {
            for (const { service, type } of VOCADB_SERVICE_RELATIONS) {
                const pv = v.song.pvs.find(v => v.service === service && v.pvType === "Original")
                if (pv) return {
                    type,
                    url: pv.url,
                    thumbnailUrl: pv.thumbUrl
                }
            }
        }).filter(nonNullable)
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

