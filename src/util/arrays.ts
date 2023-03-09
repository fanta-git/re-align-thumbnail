export function has<T extends any>(arr: readonly T[], item: any): item is T {
    return arr.includes(item)
}

export function groupBy<K, V>(array: readonly V[], getKey: (cur: V, idx: number, src: readonly V[]) => K): [K, V[]][] {
    return Array.from(
        array.reduce((map, cur, idx, src) => {
            const key = getKey(cur, idx, src)
            const list = map.get(key)
            if (list) list.push(cur)
            else map.set(key, [cur])
            return map
        }, new Map<K, V[]>())
    )
}
