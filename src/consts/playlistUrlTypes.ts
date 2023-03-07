import { ConstPlaylistUrlTypes } from "@/types/playlist";
import { r } from "@/util/regExpFromTemplate";

export const playlistUrlTypes = [
    {
        type: 'kiite',
        regexp: r`https://kiite.jp/playlist/(\w{10})`
    }
] as ConstPlaylistUrlTypes
