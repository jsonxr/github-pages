"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deferred = void 0;
function deferred() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return {
        promise,
        resolve,
        reject,
    };
}
exports.deferred = deferred;
