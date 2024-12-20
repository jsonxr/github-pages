const c = @import("c.zig");

//const Window = @import("window.zig").Window;

pub fn example() !void {
    const flags: u32 = 0;

    if (c.SDL_Init(flags)) {
        const window = c.SDL_CreateWindow(
            "SDL3 Example",
            640,
            480,
            c.SDL_WINDOW_RESIZABLE,
        );

        const renderer = c.SDL_CreateRenderer(window, null);
        _ = c.SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255); // Red
        _ = c.SDL_RenderClear(renderer);
        _ = c.SDL_RenderPresent(renderer);

        _ = c.SDL_ShowWindow(window);

        //c.SDL_Delay(30000); // Wait 3 seconds

        var event: c.SDL_Event = undefined;
        while (true) {
            while (c.SDL_PollEvent(&event)) {
                if (event.type == c.SDL_EVENT_QUIT) {
                    return;
                }
                // if (event.type == c.SDL_QuitEvent) {
                //     break;
                //     //emscripten_cancel_main_loop();
                // }
            }
        }

        c.SDL_DestroyRenderer(renderer);
        c.SDL_DestroyWindow(window);
        c.SDL_Quit();
    }
    // const window = Window.init(.{
    //     .title = "My Window",
    // });

    // try window.start();
    // defer window.deinit();
}

pub fn main() !void {
    try example();
}
