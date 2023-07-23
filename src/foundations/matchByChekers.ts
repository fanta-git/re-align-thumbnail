import { Checker } from "@/types/playlist";

// TODO: execを使ってもう少し無駄なくマッチできるようにしたい
export default function matchByChekers<T>(text: string, checkers: Checker<T>[]) {
    return checkers
        .flatMap(({ type, regexp }) => [...text.matchAll(regexp)].map(match => ({ type, match })))
        .sort((a, b) => (a.match.index ?? Infinity) - (b.match.index ?? Infinity))
}
