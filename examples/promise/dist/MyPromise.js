"use strict";
const isThenable = (value) => typeof (value === null || value === void 0 ? void 0 : value.then) === 'function';
class MyPromise {
    constructor() { }
    then(onFulfilled, onRejected) {
        return this.promise.then(onFulfilled, onRejected);
    }
}
