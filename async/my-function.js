(() => {
    const {
        AsyncArray,
        add,
        equal,
    } = Homework;

    const wrap = (fn, ...args) => {
        return new Promise((resolve) => {
            fn.apply(this, [...args, resolve]);
        })
    }

    const additionVector = function(v1, v2, cb) {
        (async function(){
            const [ length1, length2 ] = await Promise.all([
                wrap(v1.length),
                wrap(v2.length)
            ]);
            if (await wrap(equal, length1, length2)) {
                const result = new AsyncArray();
                for (let i = 0; i < length1; i++) {
                    const [ value1, value2 ] = await Promise.all([
                        wrap(v1.get, i),
                        wrap(v2.get, i)
                    ])
                    const sum = await wrap(add, value1, value2);
                    await wrap(result.push, sum);
                }
                return result;
            }
            return undefined;
        })().then((value) => {
            if (cb && typeof cb === "function") {
                cb(value);
            }
        }); 
    }

    window.additionVector = additionVector;

    Object.freeze(window.additionVector);
})();