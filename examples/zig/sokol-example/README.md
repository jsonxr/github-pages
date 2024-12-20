# Sokol Example

```sh
# native
zig build
zig-out/bin/sokol-example

# web
zig build  -Dtarget=wasm32-emscripten
npx http-server zig-out/web
open http://localhost:8080/
```
