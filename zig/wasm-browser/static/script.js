const env = {
  print: (result) => {
    console.log(`The result is ${result}`);
  },
  hello: (r) => {
    console.log('hello', r);
  },
};

(function () {
  WebAssembly.instantiateStreaming(fetch('math.wasm'), { env })
    .then((result) => {
      console.log('adding...');
      const add = result.instance.exports.add;
      add(1, 2);
    })
    .catch((err) => {
      console.error(err);
    });
})();

console.log('hmm');
