# wasm-node

Shows how to run a wasm module built in zig in node

```sh
# install
# https://www.zvm.app
# https://direnv.net
# https://nodejs.org

# setup
direnv allow # allow us to set the right zig version

# build and run the app
zig build
node main.js
# or...
zig build run # run the example
```
