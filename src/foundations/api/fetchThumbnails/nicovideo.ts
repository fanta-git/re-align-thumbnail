export async function nicovideo(ids: string[]) {
    return ids.map((v, i) => `nicoUrl:${i}`)
}
