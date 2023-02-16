"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deferred = void 0;
function deferred() {
    var resolve, reject;
    var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });
    return {
        promise: promise,
        resolve: resolve,
        reject: reject,
    };
}
exports.deferred = deferred;
