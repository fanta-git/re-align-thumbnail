export async function youtube(ids: string[]) {
    return ids.map(v => `https://img.youtube.com/vi/${v}/default.jpg`)
}
