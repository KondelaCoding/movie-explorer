import { useRef } from "react";

export function useCache<T>() {
    const cache = useRef<Record<string, T>>({});

    const get = (key: string) => cache.current[key];
    const set = (key: string, value: T) => {
        cache.current[key] = value;
    };

    return { get, set };
}
