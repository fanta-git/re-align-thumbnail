export const createCanvas = (width: number, height: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')!

    return { canvas, context }
};

export const canvas2URL = async (canvas: HTMLCanvasElement, type?: string, quality?: number) => {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))
    if (blob === null) return
    const url = URL.createObjectURL(blob)
    return url
}
