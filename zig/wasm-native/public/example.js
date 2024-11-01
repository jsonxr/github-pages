const memory = new WebAssembly.Memory({
  initial: 2, // pages 2 * 64k
  maximum: 2,
});

const text_decoder = new TextDecoder();

const wasm = {
  instance: undefined,
  getString: function (ptr, len) {
    const memory = this.instance.exports.memory;
    return text_decoder.decode(new Uint8Array(memory.buffer, ptr, len));
  },
};

const env = {
  memory,
  console_log: (ptr, len) => {
    const str = wasm.getString(ptr, len);
    console.log(str);
  },
  console_error: (ptr, len) => {
    const str = wasm.getString(ptr, len);
    console.error(str);
  },
};

async function main() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch('example.wasm'),
    { env }
  );
  wasm.instance = instance;
  instance.exports.run();
}
main();
