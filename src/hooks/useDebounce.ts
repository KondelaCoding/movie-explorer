import { useEffect, useState } from "react";

/**
 * @param value value to debounce
 * @param delay delay in milliseconds
 * @returns value after a delay
 */
export function useDebounce<T>(value: T, delay: number) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
}
