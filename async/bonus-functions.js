Promise._any = function(promises) {
    if (promises && typeof promises === 'object') {
        return new Promise((resolve, reject) => {
            let promiseFound = false;
            let failCount = 0;
            let errors = [];
            promises.forEach((promise, i) => {
                if ( promise.then ) {
                    promiseFound = true;
                    promise.then((value) => {
                        resolve(value);
                    }).catch((e) => {
                        failCount++;
                        errors[i] = e;
                        if ( failCount == promises.length) {
                            reject(errors)
                        }
                    });
                } else {
                    failCount++;
                }
            })
            if (!promiseFound) {
                resolve();
            }
        })
    } else {
        return Promise.resolve();
    }
}
Promise._allSettled = function(promises) {
    if (promises && typeof promises === 'object') {
        return new Promise((resolve, reject) => {
            let promiseFound = false;
            let complited = 0;
            let result = [];
            promises.forEach((promise, i) => {
                if ( promise.then ) {
                    promiseFound = true;
                    promise.then((value) => {
                        complited++;
                        result[i] = {
                            status: 'fulfilled',
                            value
                        }
                    }).catch((reason) => {
                        complited++;
                        result[i] = {
                            status: 'rejected',
                            reason
                        }
                    }).finally(() => {
                        if (complited === promises.length) {
                            resolve(result);
                        }
                    });
                } else {
                    complited++;
                }
            })
            if (!promiseFound) {
                resolve();
            }
        })
    } else {
        return Promise.resolve();
    }
}
Promise.prototype._finally = function(fn){
    this.then(() => {fn()}).catch(() => {fn()})
}

