export const createCanvas = (width: number, height: number, background: string = '#000000') => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')!
    context.fillStyle = background
    context.fillRect(0, 0, width, height)

    return { canvas, context }
};

export const canvas2File = async (canvas: HTMLCanvasElement, type?: string, quality?: number) => {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))
    if (blob === null) throw Error("canvasの画像化に失敗しました")
    const expansion = blob.type.split("/").pop() ?? "png"
    const file = new File([blob], `sample.${expansion}`, { type: blob.type })
    return file
}
