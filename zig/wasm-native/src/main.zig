const console = @import("./console.zig").console;

// Entry point for native
pub fn main() void {
    run();
}

// Entry point for wasm
export fn run() void {
    console.log("hello world... {d}", .{42});
    console.err("example error message...", .{});
}
