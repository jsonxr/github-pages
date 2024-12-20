const fs = require('fs');
const source = fs.readFileSync('./zig-out/bin/math.wasm');
const typedArray = new Uint8Array(source);

WebAssembly.instantiate(typedArray, {
  env: {
    print: (result) => {
      console.log(`The result is ${result}`);
    },
    hello: (r) => {
      console.log('hello', r);
    },
  },
})
  .then((result) => {
    console.log('adding...');
    const add = result.instance.exports.add;
    add(1, 2);
  })
  .catch((err) => {
    console.error(err);
  });

console.log('hmm');
