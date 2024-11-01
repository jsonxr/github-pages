# wasm-browser

The basic example to run a wasm module built in zig in a browser

```sh
# install
# https://www.zvm.app
# https://direnv.net

# setup
direnv allow # allow us to set the right zig version
bin/certs-generate.sh # Creates localhost ssl certs

# build and run the app
zig build
zig build run-web
```
