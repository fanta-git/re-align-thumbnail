import { nvapiMylistMinSchema } from "@/consts/schema";
import { FetchPlaylist } from "@/types/playlist";
import axios, { AxiosError } from "axios";

const nicovideo: FetchPlaylist = async (listId) => {
    const axiosRes = await axios.get<unknown>(
        `https://nvapi.nicovideo.jp/v2/mylists/${listId}`,
        {
            params: {
                page: 1,
                pageSize: 500,
            },
            headers: {
                "X-Frontend-Id": 6,
            }
        }
    )

    const parsed = nvapiMylistMinSchema.safeParse(axiosRes.data);
    if (!parsed.success) throw Object.assign(
        new AxiosError(
            "Request failed with status code 404",
            "ERR_BAD_REQUEST"
        ),
        { status: 404 }
    )

    const { mylist } = parsed.data.data;

    return {
        type: "nicovideo",
        title: mylist.name,
        description: mylist.description,
        id: mylist.id.toString(),
        songs: mylist.items.map(({ video: { thumbnail } }) => ({
            thumbnailUrls: [
                thumbnail.largeUrl,
                thumbnail.middleUrl,
                thumbnail.url,
            ].filter((v): v is NonNullable<typeof v> => !!v),
        }))
    }
}

export { nicovideo };
