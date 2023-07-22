export type YoutubeApiPlaylistItems = {
    kind: string;
    etag: string;
    nextPageToken?: string,
    prevPageToken?: string,
    items: {
        kind: string;
        etag: string;
        id: string;
        snippet: PlaylistSnipet;
    }[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
};

export type YoutubeApiPlaylists = {
    kind: string;
    etag: string;
    nextPageToken?: string,
    prevPageToken?: string,
    items: {
        kind: string;
        etag: string;
        id: string;
        snippet: VideoSnipet;
    }[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

export type ThumbnailTypes = "default" | "medium" | "high" | "standard" | "maxres";

export type PlaylistSnipet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
        kind: string;
        videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
};

export type VideoSnipet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    localized: {
        title: string;
        description: string;
    };
}

export type Thumbnails = {
    [K in ThumbnailTypes]: {
        url: string;
        width: number;
        height: number;
    };
}
