export const getError = (error: unknown) => {
    if (error instanceof Error) return error
    const formattedError = new Error(String(error))
    formattedError.name = "不明なエラー"
    return formattedError
}
