# wasm-native

Shows how to build an app that runs native and in browser

```sh
# install
# https://www.zvm.app
# https://direnv.net

# setup
direnv allow # allow us to set the right zig version
bin/certs-generate.sh # Creates localhost ssl certs

# build and run the app
zig build
zig build run-web # run the web example
zig-out/bin/example
```
