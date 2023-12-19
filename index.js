// the function takes in another function `originFn` as an argument.
export const withMemo = (originFn) => {
    let cache;

    // the function returns a new function
    // that is a memoized version of the original function.
    return () => {
        // if there is no cache, we populate it using the original function.
        if (cache === undefined) {
            cache = originFn();
        }

        // at the end it always returns the value from the cache.
        return cache;
    };
};

export const withMemo2 = (originFn) => {
    const cache = {
        value: undefined,
        isCached: false, // new boolean variable
    };

    return () => {
        if (!cache.isCached) {
            cache.value = originFn();
            cache.isCached = true;
        }
        return cache.value;
    };
};

export const withMemo3 = (originFn) => {
    // the `cache` variable will now be an object, where the keys
    // are the argument values and the object values are the results
    // of calling the original function with the corresponding argument.
    const cache = {};

    return (arg) => {
        // this notation may be less familiar. Essentially, it is similar to
        // `if(!cache[arg])` but will be true if `null`, `undefined`,
        // `0` or `''` are stored in the cache.
        if (!(arg in cache)) {
            cache[arg] = originFn(arg);
        }

        return cache[arg];
    };
}

export const withMemo4 = (originFn, { getKey = (arg) => arg } = {}) => {
    // Now the `cache` variable isn't just an object but an instance of a Map.
    // This is done so that keys in the `cache` can be not only strings.
    // Before, for all objects the key was the string "[object Object]".
    const cache = new Map();

    return (arg) => {
        const cacheKey = getKey(arg); // Before, the key was the argument itself.
                                      // Now, it's whatever the function getKey returns.


        if (!cache.has(cacheKey)) {
            cache.set(cacheKey, originFn(arg));
        }

        return cache.get(cacheKey);
    };
};

export const withMemo5 = (
    originFn,
    {
        getKey = (arg) => arg,
        cache = new Map(),
    } = {}
) => {
    return (arg) => {
        const cacheKey = getKey(arg);
        if (!cache.has(cacheKey)) {
            cache.set(cacheKey, originFn(arg));
        }

        return cache.get(cacheKey);
    };
};

const start1 = performance.now();
// some code for test will be added later
const end1 = performance.now();
console.log('\x1b[36m%s\x1b[0m', `First call took ${end1 - start1} milliseconds.`);

const start2 = performance.now();
// some code for test will be added later
const end2 = performance.now();
console.log('\x1b[36m%s\x1b[0m', `First call took ${end2 - start2} milliseconds.`);
