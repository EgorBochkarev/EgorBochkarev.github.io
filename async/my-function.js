(() => {
    const {
        AsyncArray,
        add,
        subtract,
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
                return sumVectors(v1, v2, length2);
            }
            return undefined;
        })().then((value) => {
            if (cb && typeof cb === "function") {
                cb(value);
            }
        }); 
    }

    const sumVectors = async function(v1, v2, initialLength, initialResult){
        if (initialLength > 0) {
            length = await wrap(subtract, initialLength, 1);
            const [ value1, value2, result ] = await Promise.all([
                wrap(v1.get, length),
                wrap(v2.get, length),
                sumVectors(v1, v2, length, initialResult)
            ])
            const sum = await wrap(add, value1, value2);
            await wrap(result.push, sum);
            return result;
        }
        return new AsyncArray();
    }

    window.additionVector = additionVector;

    Object.freeze(window.additionVector);
})();