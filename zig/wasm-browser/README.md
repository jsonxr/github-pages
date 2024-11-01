# wasm-browser

Shows how to run a wasm module built in zig in a browser

```sh
# Install zvm if you haven't...
# https://www.zvm.app/

bin/certs-generate.sh # Creates localhost ssl certs

# Build and run the app
zig build
zig build run-web
```
