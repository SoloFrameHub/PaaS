export const flattenObject = (obj: Record<string, any>, prefix = '', seen = new WeakSet()): Record<string, any> => {
    if (seen.has(obj)) return {}; // Break cycle
    seen.add(obj);

    return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (
            typeof obj[key] === 'object' &&
            obj[key] !== null &&
            !Array.isArray(obj[key]) &&
            Object.keys(obj[key]).length > 0 &&
            !(obj[key] instanceof Date)
        ) {
            Object.assign(acc, flattenObject(obj[key], pre + key, seen));
        } else {
            acc[pre + key] = obj[key];
        }
        return acc;
    }, {});
};
