const cache = new Map<string, HTMLImageElement>()

export const getImage = async (url: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const cached = cache.get(url)
    if (cached) {
        resolve(cached)
        return
    }

    const image = new Image()
    image.addEventListener('load', () => {
        cache.set(url, image)
        resolve(image)
    })
    image.addEventListener('error', e => reject(e))
    image.src = url
})

export const getYoutubeThumbnailUrl = (videoUrl: string) => {
    const [, id] = videoUrl.match(/https:\/\/www\.youtube\.com\/watch\?v=([-\w]+)/) ?? []
    if (id === undefined) return

    return `https://img.youtube.com/vi/${id}/default.jpg`
}
