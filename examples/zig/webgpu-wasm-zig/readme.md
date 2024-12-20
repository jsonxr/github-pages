# webgpu-wasm-zig

A minimal WebGPU example written in Zig, compiled to WebAssembly (wasm).

```sh
git clone --recurse-submodules https://github.com/jsonxr/webgpu-wasm-zig.git
```

```sh
zig build
npx http-server zig-out/www
```

> [!NOTE] > `build.zig` is preconfigured to build to `wasm32-emscripten` target
> only.
