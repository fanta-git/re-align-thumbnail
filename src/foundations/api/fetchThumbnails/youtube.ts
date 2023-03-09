export async function youtube(ids: string[]) {
    return ids.map((v, i) => `youtUrl:${i}`)
}
