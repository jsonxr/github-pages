const memory = new WebAssembly.Memory({
  initial: 2, // pages 2 * 64k
  maximum: 2,
});

const text_decoder = new TextDecoder();

// Helper methods called from js to get access to wasm things
const wasm = {
  instance: undefined,
  decodeString: function (ptr, len) {
    const memory = this.instance.exports.memory;
    return text_decoder.decode(new Uint8Array(memory.buffer, ptr, len));
  },
};

// Called from the zig side...
const env = {
  memory,
  console_log: (ptr, len) => {
    const str = wasm.decodeString(ptr, len);
    console.log(str);
  },
  console_error: (ptr, len) => {
    const str = wasm.decodeString(ptr, len);
    console.error(str);
  },
};

async function main() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch('example.wasm'),
    { env }
  );
  wasm.instance = instance;
  instance.exports.start();
}
main();
