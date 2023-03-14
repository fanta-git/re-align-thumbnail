export function orgRound(value: number, base = 0) {
    return Math.round(value * (10 ** base)) / (10 ** base);
}

export function orgCeil(value: number, base = 0) {
    return Math.ceil(value * (10 ** base)) / (10 ** base);
}

export function orgFloor(value: number, base = 0) {
    return Math.floor(value * (10 ** base)) / (10 ** base);
}
