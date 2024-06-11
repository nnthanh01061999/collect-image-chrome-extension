export const debounce = (fn: Function, ms: number) => {
    let t: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(t);
        t = setTimeout(() => {
            fn(...args);
        }, ms);
    };
};
