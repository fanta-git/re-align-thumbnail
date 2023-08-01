export default function formatThumbnailUrl(url: string) {
    for (const { regexp, format } of THUMBNAIL_URL_FORMATTERS) {
        const match = url.match(regexp)
        if (match === null) continue
        const [, ...matched] = match
        return format(matched)
    }

    return [url]
}

const THUMBNAIL_URL_FORMATTERS = [
    {
        regexp: /https?:\/\/tn-skr1\.smilevideo\.jp\/smile\?i=(\d+)/,
        format: ([id]) => [`http://nicovideo.cdn.nimg.jp/thumbnails/${id}`]
    },
    {
        regexp: /https?:\/\/nicovideo\.cdn\.nimg\.jp\/thumbnails\/\d+\/(\d+)(?:\.(\d+))/,
        format: ([id, key]) => [
            `http://nicovideo.cdn.nimg.jp/thumbnails/${id}/${id}.${key}.M`,
            `http://nicovideo.cdn.nimg.jp/thumbnails/${id}/${id}.${key}`,
        ]
    },
    {
        regexp: /https?:\/\/nicovideo\.cdn\.nimg\.jp\/thumbnails\/\d+\/(\d+)/,
        format: ([id]) => [`http://nicovideo.cdn.nimg.jp/thumbnails/${id}/${id}`]
    },
    {
        regexp: /https?:\/\/(i1?\.ytimg|img\.youtube)\.com\/vi\/([-\w]+)/,
        format: ([id]) => [
            `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
            `https://img.youtube.com/vi/${id}/default.jpg`
        ]
    },
] satisfies { regexp: RegExp, format: (matched: string[]) => string[] }[]
