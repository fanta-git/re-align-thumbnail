export type VocadbApiSonglistSongs = {
    items: {
        notes: string;
        order: number;
        song: Song;
    }[];
    totalCount: number;
};

export type Song = {
    artistString: string;
    createDate: string;
    defaultName: string;
    defaultNameLanguage: string;
    favoritedTimes: number;
    id: number;
    lengthSeconds: number;
    name: string;
    publishDate: string;
    pvServices: string;
    ratingScore: number;
    songType: string;
    status: string;
    version: number;
    pvs: PV[];
};

export type PV = {
    author: string;
    disabled: boolean;
    extendedMetadata?: {
        json: string
    };
    id: number;
    length: number;
    name: string;
    publishDate: string;
    pvId: string;
    service: string;
    pvType: string;
    thumbUrl: string;
    url: string;
}
