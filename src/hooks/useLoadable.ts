import { useState } from "react";

type LoadableState<T> = {
    status: "pending"
    promise: Promise<T>
} | {
    status: "fulfilled"
    data: T
} | {
    status: "rejected"
    error: unknown
}

export function useLoadable<T>(promise: Promise<T>) {
    const [loadableState, setLoadableState] = useState<LoadableState<T>>({ status: "pending", promise })

    promise
        .then(data => setLoadableState({ status: "fulfilled", data }))
        .catch(error => setLoadableState({ status: "rejected", error }))

    const load = () => {
        switch (loadableState.status) {
            case "pending":
                throw loadableState.promise
            case "fulfilled":
                return loadableState.data
            case "rejected":
                throw loadableState.error
        }
    }

    return load
}
