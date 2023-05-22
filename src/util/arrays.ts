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

export function zip<T extends any[]>(...targets:  { [P in keyof T]: readonly T[P][] }) {
    const length = Math.min(...targets.map(v => v.length))
    return Array.from(Array(length), (_, i) => targets.map(v => v[i])) as T[]
}

export function zipAll<T extends any[]>(...targets:  { [P in keyof T]: readonly T[P][] }) {
    const length = Math.max(...targets.map(v => v.length))
    return Array.from(Array(length), (_, i) => targets.map(v => v[i])) as T[]
}

export function range(max: number) {
    return Array.from(Array(max), (_, i) => i)
}

export function expansion<T extends readonly any[]>(...targets:  { [P in keyof T]: readonly T[P][] }) {
    return targets.reduce((p, c) => p.flatMap(v => c.map(w => [...v, w])), [[]]) as T[]
}

export function createObject<T extends string | number | symbol, U>(keys: readonly T[], values: readonly U[]) {
    return Object.fromEntries(zip(keys, values)) as Record<T, U>
}
