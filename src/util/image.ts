export const getImage = async (url: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', e => reject(e))
    image.src = url
})
