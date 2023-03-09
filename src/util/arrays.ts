export function has<T extends any>(arr: readonly T[], item: any): item is T {
    return arr.includes(item)
}
