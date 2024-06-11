export const throttle = (fn: Function, ms: number) => {
    let t: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
        if (t !== null) return;
        t = setTimeout(() => {
            fn(...args);
            t = null;
        }, ms);
    };
};
