const c = @cImport({
    @cInclude("SDL2/SDL.h");
});

const Window = @import("window.zig").Window;

pub fn example() !void {
    const window = Window.init(.{
        .title = "My Window",
        .fullscreen = true,
    });

    try window.start();
    defer window.deinit();
}

pub fn main() !void {
    try example();
}
