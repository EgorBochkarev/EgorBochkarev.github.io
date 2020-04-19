
function allKeysAndSymbols (object) {
    const prototype = Object.getPrototypeOf(object);
    return [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object), ...(prototype ? allKeysAndSymbols(prototype) : [])];
}

console.log(allKeysAndSymbols({}));