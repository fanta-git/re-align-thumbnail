import { useRef } from "react"

export default function useHold<T>(func: () => T, keys: any[]) {
    const currentKeys = useRef<any[]>()
    const currentResult = useRef<T>()

    if (currentKeys.current === undefined || currentKeys.current.some((v, i) => v !== keys[i])) {
        currentKeys.current = keys
        currentResult.current = func()
    }
    return currentResult.current
}
