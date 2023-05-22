export type KiiteApiList = {
    list_title: string,
    list_id: number,
    list_unique: string,
    user_name: string,
    nickname: string,
    description: string,
    songs: Song[]
}

export type Song = {
    song_id: number,
    song_unique: string,
    song_link: string,
    published_at: string,
    is_new: boolean,
    duration: number,
    thumbnail: string,
    video_id: string,
    video_url: string,
    song_title: string,
    tags: string,
    creator_id: number,
    creator_unique: string,
    creator_name: string,
    creator_link: string,
    added_at: string,
    list_title: string,
    list_id: number,
    list_unique: string
}
