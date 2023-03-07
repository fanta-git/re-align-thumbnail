export function* zip<T extends any[]>(...targets:  { [P in keyof T]: Iterable<T[P]> }) {
    const iterators = targets.map(v => v[Symbol.iterator]())
    const items = iterators.map(v => v.next())

    while (!items.some(v => v.done)) {
        yield items.map(v => v.value) as T
        for (const [i, iter] of iterators.entries()) items[i] = iter.next()
    }
}

export function* zipFull<T extends any[]>(...targets: { [P in keyof T]: Iterable<T[P]> }) {
    const iterators = targets.map(v => v[Symbol.iterator]())
    const items = iterators.map(v => v.next())

    while (!items.every(v => v.done)) {
        yield items.map(v => v.value) as Partial<T>
        for (const [i, iter] of iterators.entries()) items[i] = iter.next()
    }
}

export function* range(max: number) {
    for (let i = 0; i < max; i++) yield i
}
